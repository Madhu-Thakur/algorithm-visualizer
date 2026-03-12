import React, { useState } from "react";
import GridCell from "./GridCell";
import { bfs } from "../algorithms/graph/bfs";
import { dfs } from "../algorithms/graph/dfs";
import { dijkstra } from "../algorithms/graph/dijkstra";
import { astar } from "../algorithms/graph/astar";

const ROWS = 20;
const COLS = 20;

const createGrid = () => {
  const grid = [];

  for (let r = 0; r < ROWS; r++) {
    const row = [];

    for (let c = 0; c < COLS; c++) {
      row.push({
        row: r,
        col: c,
        type: "empty",
      });
    }

    grid.push(row);
  }

  grid[0][0].type = "start";
  grid[ROWS - 1][COLS - 1].type = "goal";

  return grid;
};

const GridVisualizer = () => {
  const [grid, setGrid] = useState(createGrid());
  const [mouseDown, setMouseDown] = useState(false);
  const [algorithm, setAlgorithm] = useState("bfs");

  const runAlgorithm = () => {
    const start = { row: 0, col: 0 };
    const goal = { row: ROWS - 1, col: COLS - 1 };

    let order = [];

    if (algorithm === "bfs") {
      order = bfs(grid, start, goal);
    }

    if (algorithm === "dfs") {
      order = dfs(grid, start, goal);
    }

    if (algorithm === "dijkstra") {
      order = dijkstra(grid, start, goal);
    }

    if (algorithm === "astar") {
      order = astar(grid, start, goal);
    }

    order.forEach((node, i) => {
      setTimeout(() => {
        setGrid((prev) => {
          const newGrid = prev.map((r) => r.map((c) => ({ ...c })));

          if (
            newGrid[node.row][node.col].type !== "start" &&
            newGrid[node.row][node.col].type !== "goal"
          ) {
            newGrid[node.row][node.col].type = "visited";
          }

          return newGrid;
        });
      }, i * 40);
    });
  };

  const toggleWall = (row, col) => {
    setGrid((prev) => {
      const newGrid = prev.map((r) => r.map((cell) => ({ ...cell })));

      const cell = newGrid[row][col];

      if (cell.type === "empty") {
        cell.type = "wall";
      } else if (cell.type === "wall") {
        cell.type = "empty";
      }

      return newGrid;
    });
  };

  const generateMaze = () => {
    setGrid((prev) => {
      const newGrid = prev.map((row) => row.map((cell) => ({ ...cell })));

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          if (newGrid[r][c].type !== "start" && newGrid[r][c].type !== "goal") {
            if (Math.random() < 0.3) {
              newGrid[r][c].type = "wall";
            } else {
              newGrid[r][c].type = "empty";
            }
          }
        }
      }

      return newGrid;
    });
  };

  const clearGrid = () => {
    setGrid(createGrid());
  };

  return (
    <div style={{ marginTop: 40 }} onMouseUp={() => setMouseDown(false)}>
      <h2 style={{ textAlign: "center" }}>Pathfinding Visualizer</h2>

      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
        >
          <option value="bfs">BFS</option>
          <option value="dfs">DFS</option>
          <option value="dijkstra">Dijkstra</option>
          <option value="astar">A*</option>
        </select>
      </div>

      <div style={{ textAlign: "center", marginBottom: 20 }}>
        {/* <button onClick={runBFS}>Run BFS</button> */}
        <button onClick={runAlgorithm}>Run {algorithm.toUpperCase()}</button>
      </div>

      <button onClick={generateMaze}>Generate Maze</button>

      <button onClick={clearGrid}>Clear Grid</button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, 25px)`,
          justifyContent: "center",
        }}
      >
        {grid.flat().map((cell, index) => (
          <GridCell
            key={index}
            type={cell.type}
            onMouseDown={() => {
              setMouseDown(true);
              toggleWall(cell.row, cell.col);
            }}
            onMouseEnter={() => {
              if (mouseDown) {
                toggleWall(cell.row, cell.col);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default GridVisualizer;
