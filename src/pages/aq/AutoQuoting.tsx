import { createRef, FC, useState } from "react";
import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";
import AppLayout from "../../components/AppLayout";
import { Layout, Model } from "flexlayout-react";
import aqLayoutModel from "./AutoQuotingLayoutModel";
import { NAVIGATION_BAR_HEIGHT } from "../../navigation/Constants";

const Page = styled(Paper)`
  position: relative;
  height: calc(100vh - ${NAVIGATION_BAR_HEIGHT}px);
`;

const AutoQuoting: FC = () => {
  const layoutRef = createRef<Layout>();
  const [layoutModel] = useState<Model>(Model.fromJson(aqLayoutModel));

  return (
    <Page>
      <AppLayout ref={layoutRef} model={layoutModel} />
    </Page>
  );
};

export default AutoQuoting;
