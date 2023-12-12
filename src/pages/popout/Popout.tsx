import { FC, ReactElement, useEffect, useRef, useState } from "react";
import { useBeforeUnload, useParams } from "react-router-dom";
import {
  getLayoutComponent,
  LayoutComponentKeys,
} from "../../components/AppLayout";
import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../../state/Store";
import {
  dequeuePopOuts,
  dockPopOut,
  enqueuePopOuts,
} from "../../state/PopupSlice";
import { appCloseKey } from "../../components/popout/AppPopout";
import { Subscription, timer } from "rxjs";
import DagChart from "../home/pricing/dagChart/DagChart";

export type PopoutState = {
  tabId: string;
  component: ComponentKeys;
};

export type PopoutsState = Array<PopoutState>;

export type PopoutProperties = {
  tabId: string;
  screenX: number;
  screenY: number;
  innerHeight: number;
  innerWidth: number;
};

const Container = styled(Paper)`
  height: 100vh;
  border-radius: 0;
`;

const POPOUT_CLOSE_TIMEOUT = 2000;

export enum PopoutComponentKeys {
  dagChart = "dagChart",
}

export type ComponentKeys = LayoutComponentKeys | PopoutComponentKeys;

const popoutComponents: Map<PopoutComponentKeys, ReactElement> = new Map([
  [PopoutComponentKeys.dagChart, <DagChart />],
]);

function isPopoutComponentKey(key: ComponentKeys): key is PopoutComponentKeys {
  return key in PopoutComponentKeys;
}

const getComponent = (key: ComponentKeys): ReactElement => {
  if (isPopoutComponentKey(key)) {
    return popoutComponents.get(key) ?? <></>;
  } else {
    return getLayoutComponent(key);
  }
};

const Popout: FC = () => {
  const { tabId: currentTabId } = useParams();
  const popouts = useAppSelector((state) => state.popouts.popOuts);
  const popout = popouts.filter((p) => p.tabId === currentTabId)?.[0];
  const tabId = useRef(popout?.tabId);
  const [component, setComponent] = useState<ComponentKeys>(
    popout?.component ?? LayoutComponentKeys.error
  );
  const dispatch = useAppDispatch();

  useBeforeUnload(() => {
    // when the popout closes on a timer due to app close, it will trigger useBeforeUnload on next page load
    // this will avoid dispatching events that are not relevant on the next page load
    const appClose = localStorage.getItem(appCloseKey);
    if (appClose === "true") {
      return;
    }

    if (tabId !== undefined) {
      if (tabId.current in PopoutComponentKeys) {
        dispatch(dequeuePopOuts(tabId.current));
      } else {
        dispatch(
          dockPopOut({ tabId: tabId.current, userInitiatedAction: false })
        );
      }
    }
  });

  useEffect(() => {
    // retrieve tabId and component from session storage - if the popout was refreshed
    // retrieve tabId and component from local storage - if the popout is opened for the first time
    const existingTabId = sessionStorage.getItem("tabId");
    const existingComponent = sessionStorage.getItem("component");
    if (existingTabId === null || existingComponent === null) {
      // popout is opened for the first time
      sessionStorage.setItem("tabId", tabId.current);
      sessionStorage.setItem("component", component);
    } else {
      // popout was only refreshed
      tabId.current = existingTabId;
      setComponent(existingComponent as ComponentKeys);

      // re-enqueue popout because it was taken out of the queue when the page was previously refreshed
      dispatch(
        enqueuePopOuts({
          tabId: existingTabId,
          component: existingComponent as ComponentKeys,
        })
      );
    }
  }, []);

  useEffect(() => {
    let timerSub: Subscription;
    window.onstorage = (ev) => {
      const { key, newValue } = ev;
      if (key === appCloseKey && newValue === "true") {
        timerSub = timer(POPOUT_CLOSE_TIMEOUT).subscribe(async () => {
          if (tabId !== undefined) {
            // dispatch state events before window close so that the updated state is persisted for the next page render
            dispatch(
              dockPopOut({ tabId: tabId.current, userInitiatedAction: false })
            );
            dispatch(dequeuePopOuts(tabId.current));
          }

          window.close();
        });
      }
      if (key === appCloseKey && newValue === null) {
        // cancelling timer if the page was reloaded instead of close
        timerSub?.unsubscribe();
      }
    };

    return () => {
      window.onstorage = null;
      timerSub?.unsubscribe();
    };
  }, []);

  return <Container elevation={0}>{getComponent(component)}</Container>;
};

export default Popout;
