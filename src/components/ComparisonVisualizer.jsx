import React, { useState } from "react";
import Visualizer from "./Visualizer";
import { useTheme } from "../contexts/ThemeContext";

import { bubbleSort } from "../algorithms/bubbleSort";
import { mergeSort } from "../algorithms/mergeSort";

const ComparisonVisualizer = ({ array, speed }) => {
  const { isDark } = useTheme();
  const [arrayA, setArrayA] = useState([...array]);
  const [arrayB, setArrayB] = useState([...array]);
  
  // State management for color visualization
  const [activeA, setActiveA] = useState([]);
  const [swappingA, setSwappingA] = useState([]);
  const [sortedA, setSortedA] = useState([]);
  
  const [activeB, setActiveB] = useState([]);
  const [swappingB, setSwappingB] = useState([]);
  const [sortedB, setSortedB] = useState([]);
  
  const [isComparing, setIsComparing] = useState(false);

  const startComparison = async () => {
    setIsComparing(true);
    
    // Reset arrays and states
    setArrayA([...array]);
    setArrayB([...array]);
    setActiveA([]);
    setSwappingA([]);
    setSortedA([]);
    setActiveB([]);
    setSwappingB([]);
    setSortedB([]);

    await Promise.all([
      bubbleSort([...array], setArrayA, speed, setActiveA, setSwappingA, setSortedA),
      mergeSort([...array], setArrayB, speed, setActiveB, setSwappingB, setSortedB)
    ]);

    setIsComparing(false);
  };

  return (
    <div className="card comparison-visualizer fade-in">
      <div className="section-title">
        <h2>
          <span className="comparison-icon">⚖️</span>
          Algorithm Comparison
        </h2>
        <div className="comparison-actions">
          <button 
            className="btn btn-primary"
            onClick={startComparison}
            disabled={isComparing}
          >
            {isComparing ? (
              <>
                <span className="loading"></span>
                Comparing...
              </>
            ) : (
              '🚀 Start Comparison'
            )}
          </button>
        </div>
      </div>

      <div className="comparison-grid">
        <div className="comparison-panel">
          <div className="algorithm-header">
            <div className="algorithm-badge algorithm-badge-bubble">
              BUBBLE SORT
            </div>
            <div className="algorithm-stats">
              <span className="stat-label">Complexity:</span>
              <span className="stat-value">O(n²)</span>
            </div>
          </div>
          <Visualizer
            array={arrayA}
            active={activeA}
            swapping={swappingA}
            sorted={sortedA}
          />
        </div>

        <div className="comparison-panel">
          <div className="algorithm-header">
            <div className="algorithm-badge algorithm-badge-merge">
              MERGE SORT
            </div>
            <div className="algorithm-stats">
              <span className="stat-label">Complexity:</span>
              <span className="stat-value">O(n log n)</span>
            </div>
          </div>
          <Visualizer
            array={arrayB}
            active={activeB}
            swapping={swappingB}
            sorted={sortedB}
          />
        </div>
      </div>

      <div className="comparison-explanation">
        <p>
          <strong>Visual Comparison:</strong> Watch how different algorithms 
          approach the same sorting problem with varying efficiency.
        </p>
        <div className="comparison-tips">
          <span className="tip">💡 Tip:</span> Try with larger arrays to see 
          the performance difference more clearly!
        </div>
      </div>
    </div>
  );
};

export default ComparisonVisualizer;
