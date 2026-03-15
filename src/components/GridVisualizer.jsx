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
  const [speed, setSpeed] = useState(50);
  const [isStepMode, setIsStepMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [algorithmData, setAlgorithmData] = useState(null);

  const runAlgorithm = async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    const start = { row: 0, col: 0 };
    const goal = { row: ROWS - 1, col: COLS - 1 };

    let result = null;

    if (algorithm === "bfs") {
      result = bfs(grid, start, goal);
    } else if (algorithm === "dfs") {
      result = dfs(grid, start, goal);
    } else if (algorithm === "dijkstra") {
      result = dijkstra(grid, start, goal);
    } else if (algorithm === "astar") {
      result = astar(grid, start, goal);
    }

    const { order, path } = result;

    // Animate the pathfinding with enhanced visualization
    for (let i = 0; i < order.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 100 - speed));
      
      setGrid((prev) => {
        const newGrid = prev.map((r) => r.map((c) => ({ ...c })));

        // Mark current node
        if (i < order.length) {
          const currentNode = order[i];
          if (
            newGrid[currentNode.row][currentNode.col].type !== "start" &&
            newGrid[currentNode.row][currentNode.col].type !== "goal"
          ) {
            newGrid[currentNode.row][currentNode.col].type = "current";
          }
        }

        // Mark previously visited nodes
        for (let j = 0; j < i; j++) {
          const visitedNode = order[j];
          if (
            newGrid[visitedNode.row][visitedNode.col].type !== "start" &&
            newGrid[visitedNode.row][visitedNode.col].type !== "goal" &&
            newGrid[visitedNode.row][visitedNode.col].type !== "current"
          ) {
            newGrid[visitedNode.row][visitedNode.col].type = "visited";
          }
        }

        return newGrid;
      });
    }

    // Show the final path
    if (path && path.length > 0) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setGrid((prev) => {
        const newGrid = prev.map((r) => r.map((c) => ({ ...c })));

        // Mark the path
        path.forEach(node => {
          if (
            newGrid[node.row][node.col].type !== "start" &&
            newGrid[node.row][node.col].type !== "goal"
          ) {
            newGrid[node.row][node.col].type = "path";
          }
        });

        // Keep visited nodes as visited (not current)
        order.forEach(node => {
          if (
            newGrid[node.row][node.col].type !== "start" &&
            newGrid[node.row][node.col].type !== "goal" &&
            newGrid[node.row][node.col].type !== "path"
          ) {
            newGrid[node.row][node.col].type = "visited";
          }
        });

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

        <div className="control-group">
          <label className="label">Speed Control</label>
          <div className="slider-group">
            <div className="slider-label">
              <span>Slow</span>
              <span>Fast</span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
              disabled={isRunning}
              className="input"
            />
          </div>
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
        <span className="legend-item">
          <span className="legend-color" style={{ backgroundColor: 'var(--grid-current)' }}></span>
          Current
        </span>
        <span className="legend-item">
          <span className="legend-color" style={{ backgroundColor: 'var(--grid-path)' }}></span>
          Path
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

      {/* Algorithm Explanation Panel */}
      <div className="algorithm-explanation">
        <h3>How {algorithm.toUpperCase()} Works</h3>
        {algorithm === 'bfs' && (
          <div className="explanation-content">
            <p><strong>Breadth-First Search (BFS)</strong> explores all nodes at the current depth before moving to nodes at the next depth level.</p>
            <ul>
              <li>✅ <strong>Guaranteed shortest path</strong> in unweighted graphs</li>
              <li>🔄 Uses a <strong>queue</strong> (FIFO - First In, First Out)</li>
              <li>🌊 Explores <strong>layer by layer</strong> like ripples in water</li>
              <li>🧠 <strong>Complete</strong> - will always find a solution if one exists</li>
            </ul>
            <div className="explanation-tips">
              <span className="tip">🎯 Best for:</span> Finding shortest paths in unweighted mazes
            </div>
          </div>
        )}
        {algorithm === 'dfs' && (
          <div className="explanation-content">
            <p><strong>Depth-First Search (DFS)</strong> explores as far as possible along each branch before backtracking.</p>
            <ul>
              <li>❌ <strong>Not guaranteed</strong> to find the shortest path</li>
              <li>🔄 Uses a <strong>stack</strong> (LIFO - Last In, First Out)</li>
              <li>🌲 Explores <strong>deep first</strong>, like exploring a maze blindly</li>
              <li>🧠 <strong>Complete</strong> - will find a solution if one exists</li>
            </ul>
            <div className="explanation-tips">
              <span className="tip">🎯 Best for:</span> Exploring all possible paths, maze generation
            </div>
          </div>
        )}
        {algorithm === 'dijkstra' && (
          <div className="explanation-content">
            <p><strong>Dijkstra's Algorithm</strong> finds the shortest path in weighted graphs by always exploring the closest unvisited node.</p>
            <ul>
              <li>✅ <strong>Guaranteed shortest path</strong> in weighted graphs</li>
              <li>🔄 Uses a <strong>priority queue</strong> (min-heap)</li>
              <li>🎯 Always picks the <strong>closest</strong> unvisited node</li>
              <li>🧠 <strong>Complete</strong> and <strong>optimal</strong></li>
            </ul>
            <div className="explanation-tips">
              <span className="tip">🎯 Best for:</span> Finding shortest paths with different movement costs
            </div>
          </div>
        )}
        {algorithm === 'astar' && (
          <div className="explanation-content">
            <p><strong>A* Algorithm</strong> is an informed search that uses heuristics to guide the search toward the goal.</p>
            <ul>
              <li>✅ <strong>Guaranteed shortest path</strong> if heuristic is admissible</li>
              <li>🔄 Uses a <strong>priority queue</strong> with f(n) = g(n) + h(n)</li>
              <li>🎯 <strong>g(n)</strong> = cost from start, <strong>h(n)</strong> = estimated cost to goal</li>
              <li>🧠 <strong>Most efficient</strong> when good heuristics are available</li>
            </ul>
            <div className="explanation-tips">
              <span className="tip">🎯 Best for:</span> Fast pathfinding with good heuristics (like Manhattan distance)
            </div>
          </div>
        )}
      </div>

      {/* Beginner Tutorial Panel */}
      <div className="tutorial-panel">
        <h3>🚀 Beginner's Guide</h3>
        <div className="tutorial-steps">
          <div className="tutorial-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <strong>Create a Maze:</strong> Click and drag on the grid to draw walls. 
              Try making a simple maze with a clear path from start (green) to goal (red).
            </div>
          </div>
          <div className="tutorial-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <strong>Choose an Algorithm:</strong> Select BFS for shortest path, 
              DFS for exploration, Dijkstra for weighted paths, or A* for smart searching.
            </div>
          </div>
          <div className="tutorial-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <strong>Watch the Magic:</strong> Click "Run" and watch how each algorithm 
              explores the maze differently. Notice the current node (purple) and visited nodes (blue).
            </div>
          </div>
          <div className="tutorial-step">
            <div className="step-number">4</div>
            <div className="step-content">
              <strong>See the Result:</strong> The yellow path shows the final solution! 
              Compare how different algorithms find different (but valid) paths.
            </div>
          </div>
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
