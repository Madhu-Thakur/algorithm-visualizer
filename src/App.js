import React, { useState, useEffect } from "react";
import "./styles/style.css";

import Navbar from "./components/Navbar";
import Visualizer from "./components/Visualizer";
import ControlPanel from "./components/ControlPanel";
import { bubbleSort } from "./algorithms/bubbleSort";
import { selectionSort } from "./algorithms/selectionSort";
import { insertionSort } from "./algorithms/insertionSort";
import { mergeSort } from "./algorithms/mergeSort";
import { quickSort } from "./algorithms/quickSort";
import ComplexityInfo from "./components/ComplexityInfo";

function App() {
  const [array, setArray] = useState([]);
  const [speed, setSpeed] = useState(50);
  const [size, setSize] = useState(30);
  const [active, setActive] = useState([]);
const [swapping, setSwapping] = useState([]);
const [sorted, setSorted] = useState([]);
const [isSorting, setIsSorting] = useState(false);
  const [algorithm, setAlgorithm] = useState("bubble");

  const generateArray = () => {
    const arr = [];

    for (let i = 0; i < size; i++) {
      arr.push(Math.floor(Math.random() * 300) + 20);
    }

    setArray(arr);
  };

  useEffect(() => {
    generateArray();
  }, []);

 const startSort = async () => {
  setIsSorting(true);

  setSorted([]);
  setActive([]);
  setSwapping([]);

  if (algorithm === "bubble") {
    await bubbleSort(
      array,
      setArray,
      speed,
      setActive,
      setSwapping,
      setSorted
    );
  }

  else if (algorithm === "selection") {
    await selectionSort(
      array,
      setArray,
      speed,
      setActive,
      setSwapping,
      setSorted
    );
  }

  else if (algorithm === "insertion") {
    await insertionSort(
      array,
      setArray,
      speed,
      setActive,
      setSwapping,
      setSorted
    );
  }

  else if (algorithm === "merge") {
    await mergeSort(
      array,
      setArray,
      speed,
      setActive,
      setSwapping,
      setSorted
    );
  }

  else if (algorithm === "quick") {
    await quickSort(
      array,
      setArray,
      speed,
      setActive,
      setSwapping,
      setSorted
    );
  }
setIsSorting(false);
};

  return (
    <div>
      <Navbar />

      <ControlPanel
        generateArray={generateArray}
        startSort={startSort}
        speed={speed}
        setSpeed={setSpeed}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        size={size}
        setSize={setSize}
        setArray={setArray}
      />

      <Visualizer
        array={array}
        active={active}
        swapping={swapping}
        sorted={sorted}
      />
      <ComplexityInfo algorithm={algorithm} />
    </div>
  );
}

export default App;
