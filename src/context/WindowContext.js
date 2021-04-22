/* eslint-disable import/no-anonymous-default-export */
import { createContext } from "react";

import useWindowWidth from "../functions/useWindowWidth";

export const WindowContext = createContext();

export default () => {
  // This handles the global user of the window dimension information
  const { windowWidth, windowHeight } = useWindowWidth();

  return [{ windowWidth, windowHeight }];
};
