import React, { createContext, useContext } from "react";

import GameRaw from "@18xx-maker/games/games/public/1830.json";

const GameContext = createContext({ game: null });

export const GameProvider = ({ children }) => {
  const context = { game: GameRaw, loadGame: () => Promise.resolve() };

  return (
    <GameContext.Provider value={context}>{children}</GameContext.Provider>
  );
};

export const useGame = () => {
  return useContext(GameContext);
};

export default GameContext;
