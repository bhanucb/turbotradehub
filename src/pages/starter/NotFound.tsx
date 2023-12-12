import { FC } from "react";
import { Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import AppLogo from "../../components/AppLogo";
import { NavLink } from "react-router-dom";

const Background = styled(Paper)`
  height: 100vh;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled(Typography)`
  letter-spacing: 0.1rem;
  color: inherit;
  text-decoration: none;
`;

const NotFound: FC = () => {
  return (
    <Background>
      <AppLogo />
      <Title noWrap>Interactive Pricing Alpha</Title>
      <br />
      <Typography variant="h5">Page Not Found</Typography>
      <NavLink to="/">
        <Typography variant="h6">Home</Typography>
      </NavLink>
    </Background>
  );
};

export default NotFound;
