import { createContext, useContext } from "react";
import defaultTo from "ramda/src/defaultTo";
import mergeDeepRight from "ramda/src/mergeDeepRight";
import { diff } from "deep-object-diff";
import GameContext from "./GameContext";


import defaultConfig from "../defaults.json";
import userConfig from "../config.json";

import useLocalState from "../util/useLocalState";

const ConfigContext = createContext({ config: {} });

export const useConfig = () => {
  const { game } = useContext(GameContext);
  const gameConfig = defaultTo({}, game && game.config);

  const [storedConfig, setStoredConfig] = useLocalState("config", {});

  const initialConfig = mergeDeepRight(defaultConfig, userConfig);

  const preSearchConfig = mergeDeepRight(initialConfig, storedConfig);

  // Add Search config in
  const searchConfig = {};

  const preGameConfig = mergeDeepRight(preSearchConfig, searchConfig);

  // Add Game config in
  const config = mergeDeepRight(preGameConfig, gameConfig);

  return {
    setConfig: (config) => setStoredConfig(diff(initialConfig, config)),
    resetConfig: () => setStoredConfig({}),
    config,
    defaultConfig,
    userConfig,
    searchConfig,
    gameConfig,
    storedConfig,
  };
};

export default ConfigContext;
