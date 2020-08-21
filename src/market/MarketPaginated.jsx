import React from "react";

import Paginate from "../util/Paginate";

import { getMarketData } from "./util";

import Market from "./Market";

const MarketPaginated = ({ config, game }) => {
  const data = getMarketData(game.stock, config);

  return (
    <Paginate component="Market" game={game} config={config} data={data}>
      <Market data={data} game={game} config={config} title={game.info.title} />
    </Paginate>
  );
};

export default MarketPaginated;
