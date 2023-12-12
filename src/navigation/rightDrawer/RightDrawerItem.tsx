import { FC, PropsWithChildren } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";

export const RightDrawerItem: FC<PropsWithChildren<{ title: string }>> = ({
  title,
  children,
}) => {
  const ItemContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    width: 100%;
  `;

  return (
    <ListItem>
      <ItemContainer>
        <Typography variant="subtitle2" gutterBottom>
          {title}
        </Typography>
        {children}
      </ItemContainer>
    </ListItem>
  );
};
