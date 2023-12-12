import { FC, useMemo, useState } from "react";
import {
  ColDef,
  ICellRendererParams,
  SelectionChangedEvent,
} from "ag-grid-community";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { deleteTab } from "../../../api/Tabs";
import Button from "@mui/material/Button";
import TreeView, { TreeViewPath } from "../components/TreeView";
import Stack from "@mui/material/Stack";
import { Paper } from "@mui/material";
import { Tab } from "../../../models/Tab";
import AppSnackbar, { useSnackbar } from "../../../components/AppSnackbar";
import { useAppDispatch, useAppSelector } from "../../../state/Store";
import { onEditTab, onOpenTab } from "../../../state/TabManagementSlice";

const TabSelectionBackground = styled(Paper)`
  height: 100%;
`;

const TabSelectionStack = styled(Stack)`
  height: 100%;
  padding: 8px 8px 8px 8px;
`;

const ActionButtons = styled(Stack)`
  justify-content: flex-end;
  padding: 8px 0;
  height: 80px;
`;

const autoGroupColumnDef: ColDef = {
  headerName: "Files",
  minWidth: 330,
  cellRendererParams: (props: ICellRendererParams) => {
    const {
      node: { group },
    } = props;
    return {
      checkbox: !!group,
      suppressCount: true,
    };
  },
};

type TabSelectionProps = {
  tabs: Array<Tab>;
  onDeleteTab: () => void;
};

const TabSelection: FC<TabSelectionProps> = (props) => {
  const { tabs, onDeleteTab } = props;
  const [selectedTabName, setSelectedTabName] = useState<string>();
  const { open, message, duration, severity, showMessage, closeMessage } =
    useSnackbar();
  const { tabIdOnEdit } = useAppSelector((state) => state.tabManagement);
  const dispatch = useAppDispatch();
  const rowData = useMemo(() => {
    return tabs.reduce((path, tab, parentIndex) => {
      return [
        ...path,
        ...tab.portfolios.map((p, childIndex) => ({
          id: `${parentIndex}${childIndex}`,
          path: [tab.name, p],
        })),
      ];
    }, [] as Array<TreeViewPath>);
  }, [tabs]);

  function handleSelectionChange(event: SelectionChangedEvent) {
    dispatch(onEditTab({ tabId: undefined }));

    const selectedNodes = event.api.getSelectedNodes();
    const selectedTabNodes = selectedNodes.filter((node) => node.group);
    const selectedTabs = selectedTabNodes
      .map((node) => node.key)
      .filter((k) => !!k) as Array<string>;

    if (selectedTabs.length === 0) {
      setSelectedTabName(undefined);
    } else {
      setSelectedTabName(selectedTabs[0]);
    }
  }

  function handleOpenTab() {
    if (selectedTabName === undefined) return;

    // todo: fill portfolios?
    const tab = { tabName: selectedTabName, portfolios: [] };
    dispatch(onOpenTab(tab));
  }

  async function handleDeleteTab() {
    if (selectedTabName === undefined) return;

    if (confirm("Do you want to delete this tab?")) {
      try {
        await deleteTab(selectedTabName);
        onDeleteTab();
      } catch (e) {
        console.error(`Error deleting tab. ${e}`);
        showMessage("Error deleting the tab", "error");
      }
    }
  }

  function handleEditTab() {
    if (tabIdOnEdit === undefined) {
      dispatch(onEditTab({ tabId: selectedTabName }));
    } else {
      dispatch(onEditTab({ tabId: undefined }));
    }
  }

  return (
    <TabSelectionBackground>
      <TabSelectionStack>
        <Typography variant="h6" gutterBottom={true}>
          Saved Tabs
        </Typography>
        <TreeView
          rowData={rowData}
          autoGroupColumnDef={autoGroupColumnDef}
          rowSelection={"single"}
          onSelectionChanged={handleSelectionChange}
        />
        <ActionButtons direction="row" spacing={2}>
          <Button
            variant="outlined"
            disabled={selectedTabName === undefined}
            onClick={handleEditTab}
          >
            {tabIdOnEdit ? "Cancel Editing Tab" : "Edit Tab"}
          </Button>
          <Button
            variant="contained"
            color="error"
            disabled={selectedTabName === undefined || !!tabIdOnEdit}
            onClick={handleDeleteTab}
          >
            Delete Tab
          </Button>
          <Button
            variant="contained"
            disabled={selectedTabName === undefined || !!tabIdOnEdit}
            onClick={handleOpenTab}
          >
            Open Tab
          </Button>
        </ActionButtons>
      </TabSelectionStack>
      <AppSnackbar
        open={open}
        message={message}
        duration={duration}
        severity={severity}
        onClose={closeMessage}
      />
    </TabSelectionBackground>
  );
};

export default TabSelection;
