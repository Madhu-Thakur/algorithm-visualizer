import React, { useState } from "react";
import Visualizer from "./Visualizer";
import { useTheme } from "../contexts/ThemeContext";

import { bubbleSort } from "../algorithms/bubbleSort";
import { mergeSort } from "../algorithms/mergeSort";

const ComparisonVisualizer = ({ array, speed }) => {
  const { isDark } = useTheme();
  const [arrayA, setArrayA] = useState([...array]);
  const [arrayB, setArrayB] = useState([...array]);
  const [isComparing, setIsComparing] = useState(false);

  const startComparison = async () => {
    setIsComparing(true);
    
    // Reset arrays
    setArrayA([...array]);
    setArrayB([...array]);

    await Promise.all([
      bubbleSort([...array], setArrayA, speed, () => {}, () => {}, () => {}),
      mergeSort([...array], setArrayB, speed, () => {}, () => {}, () => {})
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
            active={[]}
            swapping={[]}
            sorted={[]}
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
            active={[]}
            swapping={[]}
            sorted={[]}
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
