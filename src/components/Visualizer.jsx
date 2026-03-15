import React from "react";

const Visualizer = ({ array, active, swapping, sorted, showValues }) => {
  // Create a state map for each index with proper priority
  const getStateForIndex = (index) => {
    if (sorted.includes(index)) return 'sorted';    // Highest priority - once sorted, always green
    if (swapping.includes(index)) return 'swapping';
    if (active.includes(index)) return 'active';
    return 'unsorted';
  };

  return (
    <div className="card visualization-container fade-in">
      <div className="section-title">
        <h2>Array Visualization</h2>
        <div className="legend">
          <span className="legend-item">
            <span className="legend-color unsorted"></span>
            Unsorted
          </span>
          <span className="legend-item">
            <span className="legend-color active"></span>
            Active
          </span>
          <span className="legend-item">
            <span className="legend-color swapping"></span>
            Swapping
          </span>
          <span className="legend-item">
            <span className="legend-color sorted"></span>
            Sorted
          </span>
        </div>
      </div>

      <div className="array-container">
        {array.map((value, index) => {
          const state = getStateForIndex(index);
          const isHighlighted = state === 'active' || state === 'swapping';

          return (
            <div key={index} className="bar-wrapper">
              {showValues && (
                <span className="bar-value">
                  {value}
                </span>
              )}
              <div
                className={`array-bar array-bar-${state} ${isHighlighted ? 'highlighted' : ''}`}
                style={{
                  height: `${value}px`
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Visualizer;
