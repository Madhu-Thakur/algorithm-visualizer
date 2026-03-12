import React, { useState } from "react";

const ControlPanel = ({
  generateArray,
  startSort,
  startStepMode,
  nextStep,
  speed,
  setSpeed,
  algorithm,
  setAlgorithm,
  size,
  setSize,
  setArray,
  isSorting,
 
}) => {

  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleCustomArray = () => {
    setError("");

    const trimmedInput = inputValue.trim();

    if (!trimmedInput) {
      setError("Please enter numbers separated by commas (e.g., 5,3,8,1)");
      return;
    }

    const arr = trimmedInput
      .split(",")
      .map(num => num.trim())
      .filter(num => num.length > 0)
      .map(num => {
        const parsed = Number(num);
        return isNaN(parsed) ? null : parsed;
      })
      .filter(num => num !== null);

    if (arr.length === 0) {
      setError("Please enter valid numbers separated by commas");
      return;
    }

    if (arr.length > 100) {
      setError("Array size too large. Maximum 100 elements allowed.");
      return;
    }

    setArray(arr);
    setInputValue("");
  };

  return (
    <div className="control-panel">

      {/* Random Array */}
      <button onClick={generateArray} disabled={isSorting}>
        Generate Random Array
      </button>

      {/* Custom Array Input */}
      <div className="custom-array">
        <input
          type="text"
          placeholder="Enter numbers: 5,3,8,1"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isSorting}
        />

        <button onClick={handleCustomArray} disabled={isSorting}>
          Set Array
        </button>
      </div>

      {/* Algorithm Select */}
      <select
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value)}
        disabled={isSorting}
      >
        <option value="bubble">Bubble Sort</option>
        <option value="selection">Selection Sort</option>
        <option value="insertion">Insertion Sort</option>
        <option value="merge">Merge Sort</option>
        <option value="quick">Quick Sort</option>
      </select>

      {/* Start Sorting */}
      <button onClick={startSort} disabled={isSorting}>
        {isSorting ? "Sorting..." : "Start Sorting"}
      </button>

      {/* Step Mode */}
      <button onClick={startStepMode} disabled={isSorting}>
        Step Mode
      </button>

      {/* Next Step */}
      <button onClick={nextStep}>
        Next Step
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

      {error && (
        <div style={{ color: "red", marginTop: "5px" }}>
          {error}
        </div>
      )}

    </div>
  );
};

export default ControlPanel;