import { FC, PropsWithChildren, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../state/Store";
import { cancelSwitch, confirmSwitch } from "../state/SandboxSlice";

const AppSandbox: FC<PropsWithChildren> = ({ children }) => {
  const { isSandboxModeOn, switchSandboxMode } = useAppSelector(
    (state) => state.sandbox
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      switchSandboxMode &&
      confirm(
        `Are you sure you want to turn ${
          !isSandboxModeOn ? "off" : "on"
        } Sandbox mode?`
      )
    ) {
      dispatch(confirmSwitch());
    } else {
      dispatch(cancelSwitch());
    }
  }, [switchSandboxMode]);

  return <>{children}</>;
};

export default AppSandbox;
