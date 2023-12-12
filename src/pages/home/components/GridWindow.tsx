import React, { FC } from "react";
import { styled } from "@mui/material/styles";

const GridWindowWrapper = styled("div")`
  background-color: gray;
  padding: 16px;
  border-radius: 8px;
  color: white;
  height: 100%;

  .title {
    margin-bottom: 8px;
  }

  .container {
    height: calc(100% - 32px);
  }
`;

type GridWindowProps = {
  title: string;
  children: React.ReactNode;
};

const GridWindow: FC<GridWindowProps> = (props) => {
  const { title, children } = props;

  return (
    <GridWindowWrapper>
      <div className="title">{title}</div>
      <div className="container">{children}</div>
    </GridWindowWrapper>
  );
};

export default GridWindow;
