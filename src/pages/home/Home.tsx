import { createRef, useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Action,
  Actions,
  BorderNode,
  DockLocation,
  IJsonModel,
  IJsonTabNode,
  ITabSetRenderValues,
  Layout,
  Model,
  Node,
  TabSetNode,
} from "flexlayout-react";
import AddIcon from "@mui/icons-material/Add";
import {
  getLastSavedHomeLayout,
  homeLayoutKey,
  saveHomeLayout,
} from "../../api/Layouts";
import AppLayout, {
  AddNodeAction,
  DeleteTabAction,
  LayoutAction,
  MoveNodeAction,
  SelectTabAction,
} from "../../components/AppLayout";
import homeLayoutModel from "./HomeLayoutModel";
import { v4 as uuid } from "uuid";
import { useAppDispatch, useAppSelector } from "../../state/Store";
import { onSelectTab } from "../../state/TabManagementSlice";
import { NAVIGATION_BAR_HEIGHT } from "../../navigation/Constants";
import { clearPopOutProperties } from "../../state/PopupSlice";
import usePopout from "../../components/popout/hooks/UsePopout";
import { setCurrentModel } from "../../state/LayoutSlice";

const LayoutContainer = styled("div")`
  position: relative;
  height: calc(100vh - ${NAVIGATION_BAR_HEIGHT}px);
`;

const AddIconWrapper = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ThemedAddIcon = styled(AddIcon)`
  color: #808080;
  font-size: 1.3rem;
  cursor: pointer;
`;

const priceSheetIdPrefix = "price-sheet";

function getPriceSheetNode(tabName: string): IJsonTabNode {
  return {
    id: `${priceSheetIdPrefix}-${uuid()}`,
    type: "tab",
    name: tabName,
    component: "pricingLayout",
  };
}

function getTabManagerNode(): IJsonTabNode {
  return {
    id: "tab-manager-tab",
    type: "tab",
    name: "New Tab",
    component: "tabManager",
  };
}

function getAllLayoutNodeIds(node: Node, result: Array<string>) {
  result.push(node.getId());

  if (node.getChildren().length > 0) {
    for (let child of node.getChildren()) {
      getAllLayoutNodeIds(child, result);
    }
  }
}

function Home() {
  const layoutRef = createRef<Layout>();
  const [layoutModel, setLayoutModel] = useState<Model>(
    Model.fromJson(homeLayoutModel)
  );
  const layoutAction = useRef<LayoutAction>();
  const { currentModel, lastReset } = useAppSelector((state) => state.layout);
  const { lastOpenedTab } = useAppSelector((state) => state.tabManagement);
  const { handleRenderTabSet: parentHandleRenderTabSet } = usePopout();
  const dispatch = useAppDispatch();

  // update model in component when the layout model change in the global state
  useEffect(() => {
    if (currentModel === undefined) return;
    const json = JSON.parse(currentModel) as IJsonModel;
    const model = Model.fromJson(json);
    setLayoutModel(model);
  }, [currentModel]);

  // load last saved layout on page load
  useEffect(() => {
    getLastSavedHomeLayout().then(async (model) => {
      if (!!model) {
        const parent = model.getNodeById("parent-tabset");
        const childrenCount = parent?.getChildren().length ?? 0;
        if (childrenCount > 1) {
          model.doAction(Actions.deleteTab("tab-manager-tab"));
        }
        setLayoutModel(model);

        dispatch(
          onSelectTab({
            tabId: model.getActiveTabset()?.getSelectedNode()?.getId(),
          })
        );
      }
    });
  }, []);

  // actions to run when the layout is reset
  useEffect(() => {
    if (lastReset?.layoutKey !== homeLayoutKey) return;

    // reopen price sheets that were already open before the layout was reset
    const priceSheets: Array<string> = [];
    layoutModel.visitNodes((node) => {
      if (node.getId().includes(priceSheetIdPrefix)) {
        const { name } = node.toJson() as { name: string };
        priceSheets.push(name);
      }
    });

    const baseModel = Model.fromJson(homeLayoutModel);
    const parent = baseModel.getNodeById("parent-tabset");
    for (let tabName of priceSheets) {
      baseModel.doAction(
        Actions.addNode(
          getPriceSheetNode(tabName),
          parent?.getId() ?? "",
          DockLocation.CENTER,
          -1
        )
      );
    }
    baseModel.doAction(Actions.deleteTab("tab-manager-tab"));

    setLayoutModel(baseModel);
    saveHomeLayout(baseModel).then();
    dispatch(clearPopOutProperties());
  }, [lastReset]);

  useEffect(() => {
    if (lastOpenedTab === undefined) return;

    const { tabName } = lastOpenedTab;

    const tabManagerTabParent = layoutModel
      .getNodeById("tab-manager-tab")
      ?.getParent();

    if (tabManagerTabParent === undefined) return;

    const layoutNodeIds: Array<string> = [];
    getAllLayoutNodeIds(tabManagerTabParent, layoutNodeIds);
    const priceSheetTabs = layoutNodeIds.filter((node) =>
      node.includes(priceSheetIdPrefix)
    );

    const addPriceSheetTabToTabSet = (tabSetId: string, tabName: string) => {
      layoutRef.current?.addTabToTabSet(tabSetId, getPriceSheetNode(tabName));
      layoutModel.doAction(Actions.deleteTab("tab-manager-tab"));
    };

    if (priceSheetTabs.length === 0) {
      addPriceSheetTabToTabSet(tabManagerTabParent.getId(), tabName);
    } else {
      const lastPriceSheetTab = priceSheetTabs[priceSheetTabs.length - 1];
      const parentOfLastPriceSheetTab = layoutModel
        .getNodeById(lastPriceSheetTab)
        ?.getParent()
        ?.getId();

      if (parentOfLastPriceSheetTab === undefined) return;

      addPriceSheetTabToTabSet(parentOfLastPriceSheetTab, tabName);
    }
  }, [lastOpenedTab]);

  function handleAddTab(node: TabSetNode | BorderNode) {
    const model = node.getModel();

    if (!!model.getNodeById("tab-manager-tab")) {
      return;
    }

    model.doAction(
      Actions.addNode(
        getTabManagerNode(),
        node.getId(),
        DockLocation.CENTER,
        -1
      )
    );
  }

  function handleLayoutAction(action: Action) {
    layoutAction.current = action.type as LayoutAction;

    if (action.type === SelectTabAction) {
      const { tabNode = undefined } = action.data;
      if (tabNode !== undefined) {
        dispatch(onSelectTab({ tabId: tabNode }));
      }
    }

    if (
      action.type === DeleteTabAction &&
      action.data.node !== "tab-manager-tab"
    ) {
      // do not close the last tab
      const layoutNodeIds: Array<string> = [];
      getAllLayoutNodeIds(layoutModel.getRoot(), layoutNodeIds);
      const priceSheetNodeCount = layoutNodeIds.filter((i) =>
        i.includes(priceSheetIdPrefix)
      ).length;
      if (priceSheetNodeCount === 1) {
        return;
      }

      const confirmation = confirm("Are you sure you want to close this tab?");
      if (!confirmation) {
        return;
      }
    }

    return action;
  }

  function handleRenderTabSet(
    node: TabSetNode | BorderNode,
    renderValues: ITabSetRenderValues
  ) {
    parentHandleRenderTabSet(node, renderValues);

    const layoutNodeIds: Array<string> = [];
    getAllLayoutNodeIds(node, layoutNodeIds);
    layoutNodeIds.shift(); // remove the node itself and get only the children
    const hasTabManagerNodeOpen =
      layoutNodeIds.findIndex((node) => node.includes("tab-manager-tab")) >= 0;
    if (hasTabManagerNodeOpen) return;

    const hasPriceSheetNodesAsChildren =
      layoutNodeIds.findIndex((node) => node.includes(priceSheetIdPrefix)) >= 0;

    if (hasPriceSheetNodesAsChildren) {
      renderValues.stickyButtons.push(
        <AddIconWrapper
          title="Add New Tab"
          key={renderValues.stickyButtons.length - 1}
        >
          <ThemedAddIcon
            key="add-tab-button"
            onClick={() => handleAddTab(node)}
          />
        </AddIconWrapper>
      );
    }
  }

  async function handleModelChange(model: Model) {
    if (layoutAction.current === SelectTabAction) {
      await saveHomeLayout(model);
    }

    if (
      layoutAction.current === MoveNodeAction ||
      layoutAction.current === DeleteTabAction ||
      layoutAction.current === AddNodeAction ||
      layoutAction.current === SelectTabAction
    ) {
      dispatch(setCurrentModel(model.toString()));
    }
  }

  return (
    <LayoutContainer>
      <AppLayout
        ref={layoutRef}
        model={layoutModel}
        onRenderTabSet={handleRenderTabSet}
        onAction={handleLayoutAction}
        onModelChange={handleModelChange}
      />
    </LayoutContainer>
  );
}

export default Home;
