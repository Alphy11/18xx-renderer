import { useState } from "react";

export const useRangeParam = (key, initial) => {
  const [state, setValue] = useState({});

  return [state, setValue, () => {}];
};

export const useIntParam = (key, initial) => {
  const value = 0;

  const setValue = (num = 0) => {};

  return [value, setValue];
};

export const useBooleanParam = (key) => {
  return [0, () => {}];
};

export const useStringParam = (key, initial) => {
  return ["", () => {}];
};
