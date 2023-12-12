import { PropsWithChildren, useContext, useEffect } from "react";
import { Actions, Model } from "flexlayout-react";
import { useAppDispatch, useAppSelector } from "../../state/Store";
import usePopout from "./hooks/UsePopout";
import { PopoutContext } from "./context/PopoutContext";
import { dequeuePopOuts } from "../../state/PopupSlice";
import { saveHomeLayout } from "../../api/Layouts";

type LayoutPopoutProps = PropsWithChildren & { layoutModel: Model };

// layout specific common popout logic
const LayoutPopout = (props: LayoutPopoutProps) => {
  const { layoutModel, children } = props;
  const { windowRefs } = useContext(PopoutContext);
  const { lastPopout, popOuts } = useAppSelector((state) => state.popouts);
  const { unmountComponents } = usePopout();
  const dispatch = useAppDispatch();

  // action to run when a pop out is docked in
  useEffect(() => {
    if (lastPopout === undefined) return;

    const { tabId, component, closedByUser } = lastPopout;

    if (!!layoutModel?.getNodeById(tabId)) {
      layoutModel.doAction(Actions.updateNodeAttributes(tabId, { component }));

      // if the user manually saves the layout while a window is popped out the layout will have that window unmounted
      // saving the layout on unmount will prevent the layout showing "unmount" on page load
      saveHomeLayout(layoutModel).then();

      dispatch(dequeuePopOuts(lastPopout.tabId));
      if (closedByUser) {
        windowRefs.get(lastPopout.tabId)?.window.close();
      }
    }
  }, [lastPopout, windowRefs]);

  // action to run when a pop out is docked out
  useEffect(() => {
    if (layoutModel === undefined) return;

    unmountComponents(layoutModel);
  }, [popOuts.length, layoutModel]);

  return <>{children}</>;
};

export default LayoutPopout;
