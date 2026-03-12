import React from "react";

const GridCell = ({ type, onMouseDown, onMouseEnter }) => {

  let color = "white";

  if (type === "start") color = "green";
  else if (type === "goal") color = "red";
  else if (type === "wall") color = "black";
  else if (type === "visited") color = "skyblue";
  else if (type === "path") color = "yellow";

  return (
    <div
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      style={{
        width: 25,
        height: 25,
        border: "1px solid #ccc",
        backgroundColor: color,
        cursor: "pointer"
      }}
    />
  );

};

export default GridCell;