import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const complexityData = {
  bubble: {
    best: "O(n)",
    avg: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
    color: "var(--warning)"
  },
  selection: {
    best: "O(n²)",
    avg: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
    color: "var(--danger)"
  },
  insertion: {
    best: "O(n)",
    avg: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
    color: "var(--info)"
  },
  merge: {
    best: "O(n log n)",
    avg: "O(n log n)",
    worst: "O(n log n)",
    space: "O(n)",
    color: "var(--success)"
  },
  quick: {
    best: "O(n log n)",
    avg: "O(n log n)",
    worst: "O(n²)",
    space: "O(log n)",
    color: "var(--accent-primary)"
  }
};

const ComplexityInfo = ({ algorithm }) => {
  const { isDark } = useTheme();
  const data = complexityData[algorithm];

  return (
    <div className="card complexity-info fade-in">
      <div className="section-title">
        <h2>
          <span className="complexity-icon">📊</span>
          Algorithm Complexity
        </h2>
        <div className="algorithm-badge" style={{ 
          backgroundColor: data.color,
          color: isDark ? 'black' : 'white'
        }}>
          {algorithm.toUpperCase()}
        </div>
      </div>

      <div className="complexity-grid">
        <div className="complexity-item">
          <span className="complexity-label">Best Case</span>
          <span className="complexity-value best">{data.best}</span>
        </div>
        
        <div className="complexity-item">
          <span className="complexity-label">Average Case</span>
          <span className="complexity-value avg">{data.avg}</span>
        </div>
        
        <div className="complexity-item">
          <span className="complexity-label">Worst Case</span>
          <span className="complexity-value worst">{data.worst}</span>
        </div>
        
        <div className="complexity-item">
          <span className="complexity-label">Space Complexity</span>
          <span className="complexity-value space">{data.space}</span>
        </div>
      </div>

      <div className="complexity-explanation">
        <p>
          <strong>Time Complexity:</strong> Measures how the runtime grows with input size.
        </p>
        <p>
          <strong>Space Complexity:</strong> Measures additional memory usage during execution.
        </p>
      </div>
    </div>
  );
};

export default ComplexityInfo;
