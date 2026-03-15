import React, { useState } from "react";
import GridCell from "./GridCell";
import { useTheme } from "../contexts/ThemeContext";
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
  const { isDark } = useTheme();
  const [grid, setGrid] = useState(createGrid());
  const [mouseDown, setMouseDown] = useState(false);
  const [algorithm, setAlgorithm] = useState("bfs");
  const [isRunning, setIsRunning] = useState(false);

  const runAlgorithm = async () => {
    if (isRunning) return;
    
    setIsRunning(true);
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

    // Animate the pathfinding
    for (let i = 0; i < order.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 50));
      
      setGrid((prev) => {
        const newGrid = prev.map((r) => r.map((c) => ({ ...c })));

        if (
          newGrid[order[i].row][order[i].col].type !== "start" &&
          newGrid[order[i].row][order[i].col].type !== "goal"
        ) {
          newGrid[order[i].row][order[i].col].type = "visited";
        }

        return newGrid;
      });
    }
    
    setIsRunning(false);
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
    <div className="card pathfinding-visualizer fade-in" onMouseUp={() => setMouseDown(false)}>
      <div className="section-title">
        <h2>
          <span className="pathfinding-icon">🗺️</span>
          Pathfinding Visualizer
        </h2>
        <div className="pathfinding-actions">
          <button 
            className="btn btn-primary"
            onClick={runAlgorithm}
            disabled={isRunning}
          >
            {isRunning ? (
              <>
                <span className="loading"></span>
                Running...
              </>
            ) : (
              `🚀 Run ${algorithm.toUpperCase()}`
            )}
          </button>
        </div>
      </div>

      <div className="pathfinding-controls">
        <div className="control-group">
          <label className="label">Algorithm</label>
          <select
            className="input"
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            disabled={isRunning}
          >
            <option value="bfs">Breadth-First Search (BFS)</option>
            <option value="dfs">Depth-First Search (DFS)</option>
            <option value="dijkstra">Dijkstra's Algorithm</option>
            <option value="astar">A* Algorithm</option>
          </select>
        </div>

        <div className="control-buttons">
          <button 
            className="btn btn-secondary"
            onClick={generateMaze}
            disabled={isRunning}
          >
            🎲 Generate Maze
          </button>
          <button 
            className="btn btn-warning"
            onClick={clearGrid}
            disabled={isRunning}
          >
            🧹 Clear Grid
          </button>
        </div>
      </div>

      <div className="legend">
        <span className="legend-item">
          <span className="legend-color" style={{ backgroundColor: 'var(--grid-start)' }}></span>
          Start
        </span>
        <span className="legend-item">
          <span className="legend-color" style={{ backgroundColor: 'var(--grid-goal)' }}></span>
          Goal
        </span>
        <span className="legend-item">
          <span className="legend-color" style={{ backgroundColor: 'var(--grid-wall)' }}></span>
          Wall
        </span>
        <span className="legend-item">
          <span className="legend-color" style={{ backgroundColor: 'var(--grid-visited)' }}></span>
          Visited
        </span>
      </div>

      <div className="grid-container">
        <div
          className="grid-wrapper"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${COLS}, 25px)`,
            justifyContent: "center",
            gap: "1px",
            background: "var(--bg-tertiary)",
            padding: "10px",
            borderRadius: "var(--border-radius-lg)",
            border: "1px solid var(--bg-tertiary)"
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

      <div className="pathfinding-explanation">
        <p>
          <strong>Instructions:</strong> Click and drag to create walls. 
          Select an algorithm and click "Run" to visualize the pathfinding process.
        </p>
        <div className="pathfinding-tips">
          <span className="tip">💡 Tip:</span> Try creating complex mazes to see 
          how different algorithms handle obstacles!
        </div>
      </div>
    </div>
  );
};

export default GridVisualizer;
