import React, { useState } from "react";

const ControlPanel = ({
  generateArray,
  startSort,
  speed,
  setSpeed,
  algorithm,
  setAlgorithm,
  size,
  setSize,
  setArray
}) => {

  const [inputValue, setInputValue] = useState("");

  const handleCustomArray = () => {

    const arr = inputValue
      .split(",")
      .map(num => Number(num.trim()))
      .filter(num => !isNaN(num));

    if (arr.length === 0) {
      alert("Please enter valid numbers like 5,3,8,1");
      return;
    }

    setArray(arr);
  };

  return (
    <div className="control-panel">

      {/* Random Array */}
      <button onClick={generateArray}>
        Generate Random Array
      </button>

      {/* Custom Array Input */}
      <div className="custom-array">
        <input
          type="text"
          placeholder="Enter numbers: 5,3,8,1"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <button onClick={handleCustomArray}>
          Set Array
        </button>
      </div>

      {/* Algorithm Select */}
      <select
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value)}
      >
        <option value="bubble">Bubble Sort</option>
        <option value="selection">Selection Sort</option>
        <option value="insertion">Insertion Sort</option>
        <option value="merge">Merge Sort</option>
        <option value="quick">Quick Sort</option>
      </select>

      {/* Start Sorting */}
      <button onClick={startSort}>
        Start Sorting
      </button>

      {/* Speed Slider */}
      <div className="slider">
        Speed
        <input
          type="range"
          min="10"
          max="200"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
        />
      </div>

      {/* Array Size Slider */}
      <div className="slider">
        Array Size
        <input
          type="range"
          min="10"
          max="80"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
        />
      </div>

    </div>
  );
};

export default ControlPanel;