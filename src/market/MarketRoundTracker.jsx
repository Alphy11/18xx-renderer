import React from "react";

import RoundTracker from "../RoundTracker";

const MarketRoundTracker = ({ roundTracker, game, config }) => {
  if (!roundTracker) {
    return null;
  }

  if (!config.stock.display.roundTracker) {
    return null;
  }

  const { rounds } = game;
  const size = config.tokens.marketTokenSize;
  const type = roundTracker.type || "row";
  const rotation = roundTracker.rotation || 0;

  const x = config.stock.cell.width * roundTracker.x;
  const y = config.stock.cell.height * roundTracker.y + (config.stock.title === false ? 0 : 50);

  return (
    <g transform={`translate(${x} ${y})`}>
      <RoundTracker {...{ rounds, size, type, rotation }} />
    </g>
  );
};

export default MarketRoundTracker;
