import React, { useState } from "react";
import Visualizer from "./Visualizer";

import { bubbleSort } from "../algorithms/bubbleSort";
import { mergeSort } from "../algorithms/mergeSort";

const ComparisonVisualizer = ({ array, speed }) => {

  const [arrayA, setArrayA] = useState([...array]);
  const [arrayB, setArrayB] = useState([...array]);

  const startComparison = async () => {

    await Promise.all([
      bubbleSort([...array], setArrayA, speed, () => {}, () => {}, () => {}),
      mergeSort([...array], setArrayB, speed, () => {}, () => {}, () => {})
    ]);

  };

  return (
    <div style={{ marginTop: "40px" }}>

      <h2 style={{ textAlign: "center" }}>
        Algorithm Comparison
      </h2>

      <button onClick={startComparison}>
        Start Comparison
      </button>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "20px"
        }}
      >

        <div>
          <h3 style={{ textAlign: "center" }}>
            Bubble Sort
          </h3>

          <Visualizer
            array={arrayA}
            active={[]}
            swapping={[]}
            sorted={[]}
          />
        </div>

        <div>
          <h3 style={{ textAlign: "center" }}>
            Merge Sort
          </h3>

          <Visualizer
            array={arrayB}
            active={[]}
            swapping={[]}
            sorted={[]}
          />
        </div>

      </div>

    </div>
  );
};

export default ComparisonVisualizer;