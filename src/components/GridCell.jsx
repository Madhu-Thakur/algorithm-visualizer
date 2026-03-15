import React from "react";

const GridCell = ({ type, onMouseDown, onMouseEnter }) => {
  let backgroundColor = 'var(--bg-tertiary)';
  let borderColor = 'var(--bg-tertiary)';
  let cursor = 'default';
  let animation = 'none';

  if (type === "start") {
    backgroundColor = 'var(--grid-start)';
    borderColor = 'rgba(46, 204, 113, 0.3)';
    cursor = 'default';
    animation = 'pulse 2s infinite';
  } else if (type === "goal") {
    backgroundColor = 'var(--grid-goal)';
    borderColor = 'rgba(231, 76, 60, 0.3)';
    cursor = 'default';
    animation = 'pulse 2s infinite';
  } else if (type === "wall") {
    backgroundColor = 'var(--grid-wall)';
    borderColor = 'rgba(44, 62, 80, 0.3)';
    cursor = 'pointer';
  } else if (type === "visited") {
    backgroundColor = 'var(--grid-visited)';
    borderColor = 'rgba(52, 152, 219, 0.3)';
    cursor = 'default';
  } else if (type === "path") {
    backgroundColor = 'var(--grid-path)';
    borderColor = 'rgba(241, 196, 15, 0.3)';
    cursor = 'default';
  } else if (type === "current") {
    backgroundColor = 'var(--grid-current)';
    borderColor = 'rgba(155, 89, 182, 0.5)';
    cursor = 'default';
    animation = 'currentPulse 0.5s ease-in-out infinite alternate';
  } else if (type === "frontier") {
    backgroundColor = 'var(--grid-frontier)';
    borderColor = 'rgba(230, 126, 34, 0.3)';
    cursor = 'default';
    animation = 'frontierBounce 0.8s ease-in-out infinite';
  }

  return (
    <div
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      className={`grid-cell grid-cell-${type}`}
      style={{
        width: 25,
        height: 25,
        border: `1px solid ${borderColor}`,
        backgroundColor: backgroundColor,
        cursor: cursor,
        transition: 'all 0.2s ease',
        borderRadius: type === 'wall' ? '2px' : '0',
        boxShadow: type === 'start' || type === 'goal' 
          ? '0 2px 4px rgba(0,0,0,0.2)' 
          : 'none',
        position: 'relative',
        animation: animation
      }}
    >
      {type === 'start' && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '10px',
          color: 'white',
          fontWeight: 'bold',
          textShadow: '0 1px 2px rgba(0,0,0,0.5)'
        }}>
          S
        </div>
      )}
      {type === 'goal' && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '10px',
          color: 'white',
          fontWeight: 'bold',
          textShadow: '0 1px 2px rgba(0,0,0,0.5)'
        }}>
          G
        </div>
      )}
    </div>
  );
};

export default GridCell;
