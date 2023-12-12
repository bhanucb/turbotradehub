import { ChangeEvent, FC, useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { SelectionChangedEvent } from "ag-grid-community";
import { getBooks } from "../../../api/Books";
import { Tab } from "../../../models/Tab";
import { createTab, getTab, getTabs, updateTab } from "../../../api/Tabs";
import TreeView, { TreeViewPath } from "../components/TreeView";
import Stack from "@mui/material/Stack";
import { Paper } from "@mui/material";
import AppSnackbar, { useSnackbar } from "../../../components/AppSnackbar";
import { useAppDispatch, useAppSelector } from "../../../state/Store";
import { onEditTab } from "../../../state/TabManagementSlice";

const TabSelectionBackground = styled(Paper)`
  height: 100%;
`;

const TabSelectionStack = styled(Stack)`
  height: 100%;
  padding: 8px;
`;

const ActionButtons = styled(Stack)`
  justify-content: flex-end;
  padding: 8px 0;

  .text-field {
    flex: 1;
  }
`;

type TabCreationProps = {
  onCreateTab: () => void;
  onUpdateTab: () => void;
};

const TabCreation: FC<TabCreationProps> = (props) => {
  const { onCreateTab, onUpdateTab } = props;
  const { tabIdOnEdit } = useAppSelector((state) => state.tabManagement);
  const gridRef = useRef<AgGridReact>(null);
  const [rowData, setRowData] = useState<Array<TreeViewPath>>([]);
  const [selectedPortfolios, setSelectedPortfolios] = useState<Array<string>>(
    []
  );
  const [tabNameInput, setTabNameInput] = useState<string>("");
  const prevTabNameInput = useRef<string>("");
  const [savedTabs, setSavedTabs] = useState<Array<Tab>>([]);
  const { open, message, duration, severity, showMessage, closeMessage } =
    useSnackbar();
  const dispatch = useAppDispatch();

  const savedTabNames = useMemo<Set<string>>(
    () => new Set(savedTabs.map((tab) => tab.name)),
    [savedTabs]
  );

  const upsetTabBtnText = useMemo(
    () => (!!tabIdOnEdit ? "Update tab name" : "Enter a tab name"),
    [tabIdOnEdit]
  );

  const isUpsertBtnDisabled = useMemo(() => {
    return (
      tabNameInput.trim().length === 0 ||
      selectedPortfolios.length === 0 ||
      (!tabIdOnEdit && savedTabNames.has(tabNameInput))
    );
  }, [tabNameInput, selectedPortfolios, savedTabNames, tabIdOnEdit]);

  useEffect(() => {
    getBooks().then((books) => {
      const paths: Array<TreeViewPath> = books.map((book, index) => ({
        id: index,
        path: [book.department, book.portfolio],
      }));
      setRowData(paths);
    });
  }, []);

  useEffect(() => {
    getTabs().then((tabs) => setSavedTabs(tabs));
  }, []);

  useEffect(() => {
    handleEditTab().then();
  }, [tabIdOnEdit]);

  function handleSelectionChange(event: SelectionChangedEvent) {
    const selectedNodes = event.api.getSelectedNodes();
    const portfolios = selectedNodes.map((node) => node.data.path[1]);
    setSelectedPortfolios(portfolios);
  }

  function handleChangeTabNameInput(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setTabNameInput(event.target.value);
  }

  async function handleUpsertTab() {
    if (selectedPortfolios.length === 0) return;

    const trimmedTabInput = tabNameInput.trim();

    const newTab: Tab = {
      id: trimmedTabInput,
      name: trimmedTabInput,
      portfolios: selectedPortfolios,
    };

    try {
      if (tabIdOnEdit === undefined) {
        if (savedTabNames.has(trimmedTabInput)) return; // todo: handle this case

        await createTab(newTab);

        onCreateTab();

        resetComponent();

        showMessage("Successfully created the tab", "success");
      } else {
        await updateTab(prevTabNameInput.current, newTab);

        onUpdateTab();

        resetComponent();

        dispatch(onEditTab({ tabId: undefined }));

        showMessage("Successfully updated the tab", "success");
      }
    } catch (e) {
      console.error(e);
      if (tabIdOnEdit === undefined) {
        showMessage("Error creating the tab", "error");
      } else {
        showMessage("Successfully updated the tab", "error");
      }
    }
  }

  async function handleEditTab() {
    if (tabIdOnEdit === undefined) {
      resetComponent();
      prevTabNameInput.current = "";
    } else {
      resetComponent();
      const tab = await getTab(tabIdOnEdit);
      if (tab === null) return;

      prevTabNameInput.current = tab.name;
      setTabNameInput(tab.name);
      setSelectedPortfolios(tab.portfolios);
      gridRef.current?.api.forEachNode(
        (node) =>
          !!node.key &&
          tab.portfolios.includes(node.key) &&
          node.setSelected(true)
      );
    }
  }

  function resetComponent() {
    setTabNameInput("");
    setSelectedPortfolios([]);
    gridRef.current?.api?.deselectAll();
  }

  return (
    <TabSelectionBackground>
      <TabSelectionStack>
        <Typography variant="h6" gutterBottom={true}>
          Select Portfolios
        </Typography>
        <TreeView
          ref={gridRef}
          rowData={rowData}
          rowSelection={"multiple"}
          groupSelectsChildren={true}
          onSelectionChanged={handleSelectionChange}
        />
        <ActionButtons direction="row" spacing={2}>
          <TextField
            className="text-field"
            label={upsetTabBtnText}
            variant="outlined"
            value={tabNameInput}
            onChange={handleChangeTabNameInput}
          />
          <Button
            variant="contained"
            disabled={isUpsertBtnDisabled}
            onClick={handleUpsertTab}
          >
            {!!tabIdOnEdit ? "Update Tab" : "Create Tab"}
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

export default TabCreation;
