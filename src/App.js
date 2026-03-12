import React, { useState, useEffect, useCallback } from "react";
import "./styles/style.css";

import Navbar from "./components/Navbar";
import Visualizer from "./components/Visualizer";
import ControlPanel from "./components/ControlPanel";

import { bubbleSort } from "./algorithms/bubbleSort";
import { selectionSort } from "./algorithms/selectionSort";
import { insertionSort } from "./algorithms/insertionSort";
import { mergeSort } from "./algorithms/mergeSort";
import { quickSort } from "./algorithms/quickSort";

import { bubbleSortSteps } from "./algorithms/bubbleSortSteps";

import ComplexityInfo from "./components/ComplexityInfo";
import ComparisonVisualizer from "./components/ComparisonVisualizer";
import SortingRace from "./components/SortingRace";
import GridVisualizer from "./components/GridVisualizer";

function App() {

  const [array, setArray] = useState([]);

  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const [speed, setSpeed] = useState(50);
  const [size, setSize] = useState(30);

  const [active, setActive] = useState([]);
  const [swapping, setSwapping] = useState([]);
  const [sorted, setSorted] = useState([]);

  const [isSorting, setIsSorting] = useState(false);
  const [algorithm, setAlgorithm] = useState("bubble");

  const [error, setError] = useState("");

  const [mode, setMode] = useState("sorting");

  // Generate random array
  const generateArray = useCallback(() => {

    setError("");

    const arr = [];

    for (let i = 0; i < size; i++) {
      arr.push(Math.floor(Math.random() * 300) + 20);
    }

    setArray(arr);
    setSteps([]);
    setCurrentStep(0);

  }, [size]);

  useEffect(() => {
    generateArray();
  }, [generateArray]);

  // Sorting
  const startSort = useCallback(async () => {

    if (isSorting) return;

    setError("");
    setIsSorting(true);

    setSorted([]);
    setActive([]);
    setSwapping([]);

    try {

      if (algorithm === "bubble") {
        await bubbleSort(array, setArray, speed, setActive, setSwapping, setSorted);
      }

      else if (algorithm === "selection") {
        await selectionSort(array, setArray, speed, setActive, setSwapping, setSorted);
      }

      else if (algorithm === "insertion") {
        await insertionSort(array, setArray, speed, setActive, setSwapping, setSorted);
      }

      else if (algorithm === "merge") {
        await mergeSort(array, setArray, speed, setActive, setSwapping, setSorted);
      }

      else if (algorithm === "quick") {
        await quickSort(array, setArray, speed, setActive, setSwapping, setSorted);
      }

    } catch (err) {

      setError("Sorting failed.");
      console.error(err);

    } finally {

      setIsSorting(false);

    }

  }, [array, speed, algorithm, isSorting]);

  // Step Mode
  const startStepMode = () => {

    if (algorithm !== "bubble") {

      alert("Step mode currently supports Bubble Sort only");
      return;

    }

    const s = bubbleSortSteps(array);

    setSteps(s);
    setCurrentStep(0);

  };

  // Execute one step
  const nextStep = () => {

    if (currentStep >= steps.length) return;

    const step = steps[currentStep];

    if (step.type === "swap") {

      const newArray = [...array];

      const temp = newArray[step.i];
      newArray[step.i] = newArray[step.j];
      newArray[step.j] = temp;

      setArray(newArray);

    }

    setActive([step.i, step.j]);

    setCurrentStep(prev => prev + 1);

  };

  return (

    <div>

      <Navbar />

      {/* Tabs */}
      <div className="mode-tabs">

        <button onClick={() => setMode("sorting")}>
          Sorting
        </button>

        <button onClick={() => setMode("pathfinding")}>
          Pathfinding
        </button>

      </div>

      {error && (

        <div
          style={{
            color: "red",
            textAlign: "center",
            margin: "10px",
          }}
        >
          {error}
        </div>

      )}

      {/* Sorting Mode */}
      {mode === "sorting" && (

        <>

          <ControlPanel
            generateArray={generateArray}
            startSort={startSort}
            startStepMode={startStepMode}
            nextStep={nextStep}
            speed={speed}
            setSpeed={setSpeed}
            algorithm={algorithm}
            setAlgorithm={setAlgorithm}
            size={size}
            setSize={setSize}
            setArray={setArray}
            isSorting={isSorting}
          />

          <Visualizer
            array={array}
            active={active}
            swapping={swapping}
            sorted={sorted}
          />

          <ComplexityInfo algorithm={algorithm} />

          <ComparisonVisualizer array={array} speed={speed} />

          <SortingRace array={array} speed={speed} />

        </>

      )}

      {/* Pathfinding Mode */}
      {mode === "pathfinding" && (

        <GridVisualizer />

      )}

    </div>

  );

}

export default App;