import { FC, PropsWithChildren, useEffect, useRef } from "react";
import { PopoutContext } from "./context/PopoutContext";
import { useAppSelector } from "../../state/Store";
import { useBeforeUnload } from "react-router-dom";
import { hasPageReloaded, removeSlashes } from "../../utils/Misc";

export const appCloseKey = "appClose";

const AppPopout: FC<PropsWithChildren> = ({ children }) => {
  const windowRefs = useRef<Map<string, Window>>(new Map<string, Window>());
  const { popOuts } = useAppSelector((state) => state.popouts);

  function handleStoreWindowRef(tabId: string, ref: Window) {
    windowRefs.current.set(tabId, ref);
  }

  useBeforeUnload(() => {
    const path = removeSlashes(window.location.pathname);
    if (!path.includes("popout")) {
      // set this only if any window other than the popout is closed
      localStorage.setItem(appCloseKey, "true");
    }
  });

  useEffect(() => {
    localStorage.removeItem(appCloseKey);

    if (hasPageReloaded()) {
      // reattach window objects on app reload only
      for (let { tabId } of popOuts) {
        const tabRef = window.open("", tabId);
        if (tabRef !== null) {
          handleStoreWindowRef(tabId, tabRef);
        }
      }
    }
  }, []);

  return (
    <PopoutContext.Provider
      value={{
        windowRefs: windowRefs.current,
        storeWindowRef: handleStoreWindowRef,
      }}
    >
      {children}
    </PopoutContext.Provider>
  );
};

export default AppPopout;
