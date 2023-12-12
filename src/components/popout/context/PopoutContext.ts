import { createContext } from "react";

type PopoutModel = {
  windowRefs: Map<string, Window>;
  storeWindowRef: (tabId: string, ref: Window) => void;
};

const defaultPopoutModel: PopoutModel = {
  windowRefs: new Map<string, Window>(),
  storeWindowRef: () => {},
};

export const PopoutContext = createContext(defaultPopoutModel);
