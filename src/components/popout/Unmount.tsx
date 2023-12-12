import { FC } from "react";
import { useAppDispatch } from "../../state/Store";
import { dockPopOut } from "../../state/PopupSlice";
import { TabNode } from "flexlayout-react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

const MainContainer = styled(Stack)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Unmount: FC<{ node: TabNode }> = ({ node }) => {
  const dispatch = useAppDispatch();

  function handleUnmount() {
    !!node.getId() &&
      dispatch(dockPopOut({ tabId: node.getId(), userInitiatedAction: true }));
  }

  return (
    <MainContainer>
      <Typography variant="body1">This panel is shown on a new tab</Typography>
      <Box>
        <button onClick={handleUnmount}>Dock Tab</button>
      </Box>
    </MainContainer>
  );
};

export default Unmount;
