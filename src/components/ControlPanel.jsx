import React, { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

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
  handleCustomArray,
  isSorting,
  isStepMode,
  currentStep,
  steps,
  setShowValues
}) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const { isDark } = useTheme();

  const handleCustomArrayInput = () => {
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

    handleCustomArray(arr);
    setInputValue("");
  };

  return (
    <div className="card control-panel fade-in">
      <div className="section-title">
        <h2>Control Panel</h2>
        <div className="control-actions">
          <button 
            className="btn btn-primary"
            onClick={generateArray} 
            disabled={isSorting}
          >
            🎲 Generate Random Array
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="error-message" style={{ 
          color: 'var(--danger)', 
          marginBottom: 'var(--space-md)',
          padding: 'var(--space-sm) var(--space-md)',
          backgroundColor: 'rgba(231, 76, 60, 0.1)',
          borderRadius: 'var(--border-radius-md)',
          border: '1px solid rgba(231, 76, 60, 0.3)'
        }}>
          {error}
        </div>
      )}

      <div className="grid-container grid-3">
        {/* Custom Array Input */}
        <div className="input-group">
          <label className="label">Custom Array</label>
          <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
            <input
              type="text"
              className="input"
              placeholder="Enter numbers: 5,3,8,1"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isSorting}
              style={{ flex: 1 }}
            />
            <button 
              className="btn btn-secondary"
              onClick={handleCustomArrayInput} 
              disabled={isSorting}
            >
              Set Array
            </button>
          </div>
        </div>

        {/* Algorithm Selection */}
        <div className="input-group">
          <label className="label">Algorithm</label>
          <select
            className="input"
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
        </div>

        {/* Array Size */}
        <div className="input-group">
          <label className="label">Array Size: {size}</label>
          <input
            type="range"
            min="10"
            max="80"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            disabled={isSorting}
          />
        </div>
      </div>

      <div className="grid-container grid-4" style={{ marginTop: 'var(--space-lg)' }}>
        {/* Main Actions */}
        <div className="input-group">
          <label className="label">Actions</label>
          <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-success"
              onClick={startSort} 
              disabled={isSorting}
            >
              {isSorting ? (
                <>
                  <span className="loading"></span>
                  Sorting...
                </>
              ) : (
                '🚀 Start Sorting'
              )}
            </button>
            <button 
              className="btn btn-warning"
              onClick={startStepMode} 
              disabled={isSorting}
              style={{
                backgroundColor: isStepMode ? 'var(--warning)' : '',
                color: isStepMode ? 'white' : '',
                fontWeight: isStepMode ? '800' : '600'
              }}
            >
              📝 Step Mode {isStepMode && '●'}
            </button>
            <button 
              className="btn btn-info"
              onClick={nextStep}
              disabled={!isStepMode || (isStepMode && currentStep >= steps.length)}
            >
              ▶️ Next Step
            </button>
          </div>
        </div>

        {/* Speed Control */}
        <div className="input-group">
          <label className="label">Speed: {speed}ms</label>
          <input
            type="range"
            min="10"
            max="200"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Step Mode Completion Indicator */}
      {isStepMode && currentStep >= steps.length && (
        <div style={{ 
          marginTop: 'var(--space-md)',
          padding: 'var(--space-sm) var(--space-md)',
          backgroundColor: 'rgba(46, 204, 113, 0.1)',
          borderRadius: 'var(--border-radius-md)',
          border: '1px solid rgba(46, 204, 113, 0.3)',
          textAlign: 'center'
        }}>
          <span style={{ 
            color: 'var(--success)', 
            fontWeight: '800',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-sm)'
          }}>
            ✅ Sorting Complete! All bars are green.
          </span>
        </div>
      )}

    </div>
  );
};

export default ControlPanel;
