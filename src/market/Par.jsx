import React from "react";


import addIndex from "ramda/src/addIndex";
import chain from "ramda/src/chain";
import is from "ramda/src/is";
import map from "ramda/src/map";
import Ledges from "./Ledges";
import ParCell from "./ParCell";

const Par = ({ data, title }) => {
  const { values } = data;

  const makeCell = (cell, x, y) => {
    if (is(String, cell)) {
      cell = {
        label: cell,
        par: true
      };
    } else if (is(Number, cell)) {
      cell = {
        value: cell,
        par: true
      };
    } else if (is(Object, cell)) {
      cell = {
        ...cell,
        par: true
      };
    } else {
      return null;
    }

    return (
      <g key={`par-${x}-${y}`}
         transform={`translate(${x * data.width} ${y * data.height + (data.par.title === false ? 0 : 50)})`}
      >
        <ParCell cell={cell} data={data} />
      </g>
    );
  };

  const cells = addIndex(chain)((row, y) => {
    if (is(Array, row)) {
      return addIndex(map)((col, x) => makeCell(col, x, y), row);
    } 
      
return [makeCell(row, 0, y)];
    
  }, values);

  return (
    <g>
      {title && (
        <text
          fontFamily="display"
          fontStyle="bold"
          fontSize="25"
          dominantBaseline="hanging"
          x="0"
          y="12.5"
        >
          {title}
        </text>
      )}
      {cells}
      <Ledges data={data} />
    </g>
  );
};

export default Par;
