import React from "react";

const Visualizer = ({ array, active, swapping, sorted }) => {

  return (
    <div className="array-container">

      {array.map((value, index) => {

        let color = "#3498db";

        if (sorted.includes(index)) color = "green";
        else if (swapping.includes(index)) color = "yellow";
        else if (active.includes(index)) color = "red";

        return (
          <div
            key={index}
            className="array-bar"
            style={{
              height: `${value}px`,
              backgroundColor: color
            }}
          />
        );

      })}

    </div>
  );

};

export default Visualizer;