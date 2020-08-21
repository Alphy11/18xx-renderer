import React from "react";


import addIndex from "ramda/src/addIndex";
import chain from "ramda/src/chain";
import map from "ramda/src/map";
import range from "ramda/src/range";
import splitEvery from "ramda/src/splitEvery";
import Cell from "./Cell";

const Revenue = ({ data, game, config }) => {
  const { min, max, perRow } = data;
  const numbers = splitEvery(perRow, range(min, max + 1));

  const cells = addIndex(chain)((row, y) => {
    return addIndex(map)((number, x) => {
      const cell = {
        value: number
      };

      if (number % 10 === 0) {
        cell.color = "orange";
      } else if (number % 5 === 0) {
        cell.color = "yellow";
      }

      return (
        <g key={`revenue-${x}-${y}`}
           transform={`translate(${x * data.width} ${y * data.height + 50})`}>
          <Cell {...{ cell, data, game, config }} />
        </g>
      );
    }, row);
  }, numbers);

  return (
    <g>
      <text
        fontFamily="display"
        fontStyle="bold"
        fontSize="25"
        dominantBaseline="hanging"
        x="0"
        y="12.5"
      >
        {game.info.title} Revenue
      </text>
      {cells}
    </g>
  );
};

export default Revenue;
