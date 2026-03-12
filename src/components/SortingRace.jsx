import React, { useState } from "react";
import Visualizer from "./Visualizer";

import { bubbleSort } from "../algorithms/bubbleSort";
import { mergeSort } from "../algorithms/mergeSort";
import { quickSort } from "../algorithms/quickSort";

const SortingRace = ({ array, speed }) => {

  const [bubbleArray, setBubbleArray] = useState([...array]);
  const [mergeArray, setMergeArray] = useState([...array]);
  const [quickArray, setQuickArray] = useState([...array]);

  const [winner, setWinner] = useState("");

  const runRace = async () => {

    setWinner("");

    const runAlgo = async (name, algo, setArr) => {

      const start = performance.now();

      await algo(
        [...array],
        setArr,
        speed,
        () => {},
        () => {},
        () => {}
      );

      const end = performance.now();

      return {
        name,
        time: end - start
      };

    };

    const results = await Promise.all([
      runAlgo("Bubble Sort", bubbleSort, setBubbleArray),
      runAlgo("Merge Sort", mergeSort, setMergeArray),
      runAlgo("Quick Sort", quickSort, setQuickArray)
    ]);

    results.sort((a, b) => a.time - b.time);

    setWinner(results[0].name);

  };

  return (

    <div style={{ marginTop: "40px" }}>

      <h2 style={{ textAlign: "center" }}>
        Sorting Race
      </h2>

      <button onClick={runRace}>
        Start Race
      </button>

      {winner && (
        <h3 style={{ textAlign: "center", color: "lime" }}>
          🏆 Winner: {winner}
        </h3>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "20px"
        }}
      >

        <div>
          <h4 style={{ textAlign: "center" }}>Bubble Sort</h4>
          <Visualizer
            array={bubbleArray}
            active={[]}
            swapping={[]}
            sorted={[]}
          />
        </div>

        <div>
          <h4 style={{ textAlign: "center" }}>Merge Sort</h4>
          <Visualizer
            array={mergeArray}
            active={[]}
            swapping={[]}
            sorted={[]}
          />
        </div>

        <div>
          <h4 style={{ textAlign: "center" }}>Quick Sort</h4>
          <Visualizer
            array={quickArray}
            active={[]}
            swapping={[]}
            sorted={[]}
          />
        </div>

      </div>

    </div>
  );

};

export default SortingRace;