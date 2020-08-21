import React from "react";

import Paginate from "../util/Paginate";

import { getParData } from "./util";

import Par from "./Par";

const ParPaginated = ({ config, game }) => {
  const data = getParData(game.stock, config);

  return (
    <Paginate component="Par" game={game} config={config} data={data}>
      <Par data={data} title={game.info.title} />
    </Paginate>
  );
};

export default ParPaginated;
