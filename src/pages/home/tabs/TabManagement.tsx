import { FC, useEffect, useState } from "react";
import TabSelection from "./TabSelection";
import { styled } from "@mui/material/styles";
import TabCreation from "./TabCreation";
import Grid from "@mui/material/Unstable_Grid2";
import { getTabs } from "../../../api/Tabs";
import { Tab } from "../../../models/Tab"; // Grid version 2

const TabManagementGrid = styled(Grid)`
  height: 100%;
`;

const TabManagement: FC = () => {
  const [tabs, setTabs] = useState<Array<Tab>>([]);

  async function fetchTabs() {
    const tabs = await getTabs();
    setTabs(tabs);
  }

  useEffect(() => {
    fetchTabs().then();
  }, []);

  return (
    <TabManagementGrid container>
      <Grid xs={12} md={6}>
        <TabSelection tabs={tabs} onDeleteTab={fetchTabs} />
      </Grid>
      <Grid xs={12} md={6}>
        <TabCreation onCreateTab={fetchTabs} onUpdateTab={fetchTabs} />
      </Grid>
    </TabManagementGrid>
  );
};

export default TabManagement;
