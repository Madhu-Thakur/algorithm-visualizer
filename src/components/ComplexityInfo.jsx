import React from "react";

const complexityData = {

  bubble: {
    best: "O(n)",
    avg: "O(n²)",
    worst: "O(n²)",
    space: "O(1)"
  },

  selection: {
    best: "O(n²)",
    avg: "O(n²)",
    worst: "O(n²)",
    space: "O(1)"
  },

  insertion: {
    best: "O(n)",
    avg: "O(n²)",
    worst: "O(n²)",
    space: "O(1)"
  },

  merge: {
    best: "O(n log n)",
    avg: "O(n log n)",
    worst: "O(n log n)",
    space: "O(n)"
  },

  quick: {
    best: "O(n log n)",
    avg: "O(n log n)",
    worst: "O(n²)",
    space: "O(log n)"
  }

};

const ComplexityInfo = ({ algorithm }) => {

  const data = complexityData[algorithm];

  return (
    <div className="complexity-panel">

      <h3>Algorithm Complexity</h3>

      <p>Best: {data.best}</p>
      <p>Average: {data.avg}</p>
      <p>Worst: {data.worst}</p>
      <p>Space: {data.space}</p>

    </div>
  );
};

export default ComplexityInfo;