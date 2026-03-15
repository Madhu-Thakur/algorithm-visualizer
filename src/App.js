import React, { useState, useEffect, useCallback } from "react";
import "./styles/design-system.css";

import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Visualizer from "./components/Visualizer";
import ControlPanel from "./components/ControlPanel";

import { bubbleSort } from "./algorithms/bubbleSort";
import { selectionSort } from "./algorithms/selectionSort";
import { insertionSort } from "./algorithms/insertionSort";
import { mergeSort } from "./algorithms/mergeSort";
import { quickSort } from "./algorithms/quickSort";

import { bubbleSortSteps } from "./algorithms/bubbleSortSteps";
import { selectionSortSteps } from "./algorithms/selectionSortSteps";
import { insertionSortSteps } from "./algorithms/insertionSortSteps";
import { mergeSortSteps } from "./algorithms/mergeSortSteps";
import { quickSortSteps } from "./algorithms/quickSortSteps";

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
  const [isStepMode, setIsStepMode] = useState(false);
  const [algorithm, setAlgorithm] = useState("bubble");
  const [showValues, setShowValues] = useState(false);

  const [error, setError] = useState("");

  const [mode, setMode] = useState("sorting");

  // Handle custom array input
  const handleCustomArray = (arr) => {
    setError("");
    setIsStepMode(false);
    setArray(arr);
    setSteps([]);
    setCurrentStep(0);
    setShowValues(true);
  };

  // Generate random array
  const generateArray = useCallback(() => {

    setError("");
    setIsStepMode(false);

    const arr = [];

    for (let i = 0; i < size; i++) {
      arr.push(Math.floor(Math.random() * 300) + 20);
    }

    setArray(arr);
    setSteps([]);
    setCurrentStep(0);
    setShowValues(false);

  }, [size]);

  useEffect(() => {
    generateArray();
  }, [generateArray]);

  // Sorting
  const startSort = useCallback(async () => {

    if (isSorting) return;

    setError("");
    setIsSorting(true);
    setIsStepMode(false);

    setSteps([]);
    setCurrentStep(0);
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
    let s = [];

    if (algorithm === "bubble") {
      s = bubbleSortSteps(array);
    } else if (algorithm === "selection") {
      s = selectionSortSteps(array);
    } else if (algorithm === "insertion") {
      s = insertionSortSteps(array);
    } else if (algorithm === "merge") {
      s = mergeSortSteps(array);
    } else if (algorithm === "quick") {
      s = quickSortSteps(array);
    }

    setSteps(s);
    setCurrentStep(0);
    setActive([]);
    setSwapping([]);
    setSorted([]);
    setIsStepMode(true);
  };

  // Execute one step
  const nextStep = () => {
    if (currentStep >= steps.length) return;

    const step = steps[currentStep];
    const newArray = [...array];

    switch (step.type) {
      case "swap":
        // Handle swap operations
        if (step.indices && step.indices.length === 2) {
          const [i, j] = step.indices;
          const temp = newArray[i];
          newArray[i] = newArray[j];
          newArray[j] = temp;
          setArray(newArray);
          setActive([i, j]);
          setSwapping([i, j]);
        }
        break;

      case "shift":
        // Handle shift operations (insertion sort)
        if (step.indices && step.values) {
          const [pos] = step.indices;
          const [, value] = step.values;
          newArray[pos] = value;
          setArray(newArray);
          setActive([]);
          setSwapping([pos]);
        }
        break;

      case "insert":
        // Handle insert operations (insertion sort)
        if (step.indices && step.values) {
          const [pos] = step.indices;
          const [, value] = step.values;
          newArray[pos] = value;
          setArray(newArray);
          setActive([]);
          setSwapping([pos]);
        }
        break;

      case "merge":
        // Handle merge operations (merge sort)
        if (step.indices && step.values) {
          const [pos] = step.indices;
          const [, value] = step.values;
          newArray[pos] = value;
          setArray(newArray);
          setActive([]);
          setSwapping([pos]);
        }
        break;

      case "compare":
        // Handle comparison operations
        if (step.indices) {
          setActive(step.indices);
          setSwapping([]);
        }
        break;

      case "active":
        // Handle active state changes
        if (step.indices) {
          setActive(step.indices);
          setSwapping([]);
        }
        break;

      case "update_min":
        // Handle minimum updates (selection sort)
        if (step.indices) {
          setActive(step.indices);
          setSwapping([]);
        }
        break;

      case "pivot":
        // Handle pivot selection (quick sort)
        if (step.indices) {
          setActive(step.indices);
          setSwapping([]);
        }
        break;

      case "sorted":
        // Handle sorted state updates
        if (step.indices) {
          setSorted(prev => {
            const newSorted = [...prev];
            step.indices.forEach(idx => {
              if (!newSorted.includes(idx)) {
                newSorted.push(idx);
              }
            });
            return newSorted;
          });
          setActive([]);
          setSwapping([]);
        }
        break;

      default:
        // Default case - just update active state
        if (step.indices) {
          setActive(step.indices);
        }
        break;
    }

    // Clear swapping state after a short delay for visual effect
    if (step.type !== "swap" && step.type !== "shift" && step.type !== "insert" && step.type !== "merge") {
      setTimeout(() => {
        setSwapping([]);
      }, 100);
    }

    setCurrentStep(prev => prev + 1);

    // Check if this was the final step and auto-complete sorting
    if (currentStep >= steps.length - 1) {
      // Mark all elements as sorted when step mode completes
      setSorted(Array.from({ length: array.length }, (_, i) => i));
      // Auto-turn off step mode
      setIsStepMode(false);
      // Clear active states
      setActive([]);
      setSwapping([]);
    }
  };

  return (

    <ThemeProvider>
      <div className="app-container">

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
              handleCustomArray={handleCustomArray}
              isSorting={isSorting}
              isStepMode={isStepMode}
              currentStep={currentStep}
              steps={steps}
              setShowValues={setShowValues}
            />

            <Visualizer
              array={array}
              active={active}
              swapping={swapping}
              sorted={sorted}
              showValues={showValues}
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
    </ThemeProvider>

  );

}

export default App;