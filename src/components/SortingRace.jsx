import React, { useState } from "react";
import Visualizer from "./Visualizer";
import { useTheme } from "../contexts/ThemeContext";

import { bubbleSort } from "../algorithms/bubbleSort";
import { mergeSort } from "../algorithms/mergeSort";
import { quickSort } from "../algorithms/quickSort";

const SortingRace = ({ array, speed }) => {
  const { isDark } = useTheme();
  const [bubbleArray, setBubbleArray] = useState([...array]);
  const [mergeArray, setMergeArray] = useState([...array]);
  const [quickArray, setQuickArray] = useState([...array]);
  
  // State management for color visualization
  const [activeBubble, setActiveBubble] = useState([]);
  const [swappingBubble, setSwappingBubble] = useState([]);
  const [sortedBubble, setSortedBubble] = useState([]);
  
  const [activeMerge, setActiveMerge] = useState([]);
  const [swappingMerge, setSwappingMerge] = useState([]);
  const [sortedMerge, setSortedMerge] = useState([]);
  
  const [activeQuick, setActiveQuick] = useState([]);
  const [swappingQuick, setSwappingQuick] = useState([]);
  const [sortedQuick, setSortedQuick] = useState([]);
  
  const [winner, setWinner] = useState("");
  const [isRacing, setIsRacing] = useState(false);

  const runRace = async () => {
    setIsRacing(true);
    setWinner("");

    // Reset arrays and states
    setBubbleArray([...array]);
    setMergeArray([...array]);
    setQuickArray([...array]);
    setActiveBubble([]);
    setSwappingBubble([]);
    setSortedBubble([]);
    setActiveMerge([]);
    setSwappingMerge([]);
    setSortedMerge([]);
    setActiveQuick([]);
    setSwappingQuick([]);
    setSortedQuick([]);

    const runAlgo = async (name, algo, setArr, setActive, setSwapping, setSorted) => {
      const start = performance.now();

      await algo(
        [...array],
        setArr,
        speed,
        setActive,
        setSwapping,
        setSorted
      );

      const end = performance.now();

      return {
        name,
        time: end - start
      };
    };

    const results = await Promise.all([
      runAlgo("Bubble Sort", bubbleSort, setBubbleArray, setActiveBubble, setSwappingBubble, setSortedBubble),
      runAlgo("Merge Sort", mergeSort, setMergeArray, setActiveMerge, setSwappingMerge, setSortedMerge),
      runAlgo("Quick Sort", quickSort, setQuickArray, setActiveQuick, setSwappingQuick, setSortedQuick)
    ]);

    results.sort((a, b) => a.time - b.time);
    setWinner(results[0].name);
    setIsRacing(false);
  };

  const getWinnerColor = (algorithm) => {
    if (winner === algorithm) return 'var(--success)';
    return 'var(--text-secondary)';
  };

  return (
    <div className="card sorting-race fade-in">
      <div className="section-title">
        <h2>
          <span className="race-icon">🏁</span>
          Sorting Race
        </h2>
        <div className="race-actions">
          <button 
            className="btn btn-primary"
            onClick={runRace}
            disabled={isRacing}
          >
            {isRacing ? (
              <>
                <span className="loading"></span>
                Racing...
              </>
            ) : (
              '🏁 Start Race'
            )}
          </button>
        </div>
      </div>

      {winner && (
        <div className="race-winner">
          <span className="winner-icon">🏆</span>
          <span className="winner-text">Winner: {winner}</span>
          <span className="winner-badge">Fastest Algorithm</span>
        </div>
      )}

      <div className="race-grid">
        <div className="race-panel">
          <div className="race-header">
            <div className="race-badge race-badge-bubble">
              BUBBLE SORT
            </div>
            <div className="race-status" style={{ color: getWinnerColor('Bubble Sort') }}>
              {winner === 'Bubble Sort' ? '1st Place' : 'Competing'}
            </div>
          </div>
          <Visualizer
            array={bubbleArray}
            active={activeBubble}
            swapping={swappingBubble}
            sorted={sortedBubble}
          />
        </div>

        <div className="race-panel">
          <div className="race-header">
            <div className="race-badge race-badge-merge">
              MERGE SORT
            </div>
            <div className="race-status" style={{ color: getWinnerColor('Merge Sort') }}>
              {winner === 'Merge Sort' ? '1st Place' : 'Competing'}
            </div>
          </div>
          <Visualizer
            array={mergeArray}
            active={activeMerge}
            swapping={swappingMerge}
            sorted={sortedMerge}
          />
        </div>

        <div className="race-panel">
          <div className="race-header">
            <div className="race-badge race-badge-quick">
              QUICK SORT
            </div>
            <div className="race-status" style={{ color: getWinnerColor('Quick Sort') }}>
              {winner === 'Quick Sort' ? '1st Place' : 'Competing'}
            </div>
          </div>
          <Visualizer
            array={quickArray}
            active={activeQuick}
            swapping={swappingQuick}
            sorted={sortedQuick}
          />
        </div>
      </div>

      <div className="race-explanation">
        <p>
          <strong>Algorithm Race:</strong> Watch three different sorting algorithms 
          compete to see which one finishes first!
        </p>
        <div className="race-tips">
          <span className="tip">💡 Tip:</span> Try with different array sizes to see 
          how performance varies between algorithms.
        </div>
      </div>
    </div>
  );
};

export default SortingRace;
