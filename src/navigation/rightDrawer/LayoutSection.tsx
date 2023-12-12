import { FC } from "react";
import { RightDrawerItem } from "./RightDrawerItem";
import Button from "@mui/material/Button";
import RestoreIcon from "@mui/icons-material/Restore";
import SaveIcon from "@mui/icons-material/Save";
import InstallDesktopIcon from "@mui/icons-material/InstallDesktop";
import {
  getLastSavedHomeLayout,
  homeLayoutKey,
  pricingLayoutKey,
  saveHomeLayout,
} from "../../api/Layouts";
import { useAppDispatch, useAppSelector } from "../../state/Store";
import { resetLayout, setCurrentModel } from "../../state/LayoutSlice";
import Stack from "@mui/material/Stack";
import { updatePopOutProperties } from "../../state/PopupSlice";
import {
  ComponentKeys,
  PopoutComponentKeys,
  PopoutProperties,
} from "../../pages/popout/Popout";
import usePopout from "../../components/popout/hooks/UsePopout";
import { LayoutComponentKeys } from "../../components/AppLayout";
import homeLayoutModel from "../../pages/home/HomeLayoutModel";
import { Actions, Model } from "flexlayout-react";
import { onSelectTab } from "../../state/TabManagementSlice";

type LayoutResetProps = {
  toggleDrawer: () => void;
};

const confirmMessage = "Are you sure you want to reset the layout?";

const LayoutSection: FC<LayoutResetProps> = (props) => {
  const dispatch = useAppDispatch();
  const { popOuts, popoutProperties } = useAppSelector(
    (state) => state.popouts
  );
  const { currentModel } = useAppSelector((state) => state.layout);
  const { openPopup, unmountComponents } = usePopout();
  const { toggleDrawer } = props;

  function handleResetLayout() {
    if (confirm(confirmMessage)) {
      dispatch(resetLayout(pricingLayoutKey));
      dispatch(resetLayout(homeLayoutKey));
      toggleDrawer();
    }
  }

  async function handleSaveLayout() {
    const properties: Array<PopoutProperties> = [];
    for (let popout of popOuts) {
      const ref = window.open("", popout.tabId);
      if (ref === null) continue;

      const screenX = ref.screenX;
      const screenY = ref.screenY;
      const innerHeight = ref.innerHeight;
      const innerWidth = ref.innerWidth;

      properties.push({
        tabId: popout.tabId,
        screenX,
        screenY,
        innerHeight,
        innerWidth,
      });
    }
    dispatch(updatePopOutProperties(properties));
    if (currentModel !== undefined) await saveHomeLayout(currentModel);
    toggleDrawer();
  }

  async function loadLayout() {
    const model =
      (await getLastSavedHomeLayout()) ?? Model.fromJson(homeLayoutModel);

    const parent = model.getNodeById("parent-tabset");
    const childrenCount = parent?.getChildren().length ?? 0;
    if (childrenCount > 1) {
      model.doAction(Actions.deleteTab("tab-manager-tab"));
    }

    unmountComponents(model);
    dispatch(setCurrentModel(model.toString()));
    dispatch(
      onSelectTab({
        tabId: model.getActiveTabset()?.getSelectedNode()?.getId(),
      })
    );

    for (let props of popoutProperties) {
      const { tabId } = props;
      let component: ComponentKeys;

      if (tabId in PopoutComponentKeys) {
        component = tabId as PopoutComponentKeys;
      } else {
        const node = model.getNodeById(tabId);
        if (node === undefined) return;

        const json = node.toJson() as { component: string };
        component = json.component as LayoutComponentKeys;
        if (component === undefined) {
          component = LayoutComponentKeys.error;
        }
      }

      await openPopup(tabId, component);
    }
    toggleDrawer();
  }

  return (
    <RightDrawerItem title={"Layout"}>
      <Stack spacing={2} direction="row" justifyContent="space-between">
        <Button
          fullWidth
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSaveLayout}
        >
          Save
        </Button>
        <Button
          fullWidth
          variant="contained"
          startIcon={<InstallDesktopIcon />}
          onClick={loadLayout}
        >
          Load
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="error"
          startIcon={<RestoreIcon />}
          onClick={handleResetLayout}
        >
          Reset
        </Button>
      </Stack>
    </RightDrawerItem>
  );
};

export default LayoutSection;
