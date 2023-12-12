import { FC, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { useAuthUser, useSignOut } from "react-auth-kit";
import { logout } from "../../api/Authentication";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import AppSnackbar, { useSnackbar } from "../../components/AppSnackbar";

const StyledLogoutSection = styled(Box)`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
`;

const LogoutSection: FC = () => {
  const signOut = useSignOut();
  const authUser = useAuthUser();
  const [loading, setLoading] = useState<boolean>(false);
  const { open, message, duration, severity, showMessage, closeMessage } =
    useSnackbar();

  async function handleLogout() {
    const data = authUser();
    if (data === null) return;

    try {
      const { email } = data;
      setLoading(true);
      await logout(email);
      signOut();
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error(e);
      showMessage("Error signing out. Please contact support.", "error");
    }
  }

  return (
    <>
      <StyledLogoutSection
        sx={{
          p: 2,
        }}
      >
        <LoadingButton
          loading={loading}
          startIcon={<LogoutIcon />}
          color="error"
          variant="contained"
          onClick={handleLogout}
        >
          Sign Out
        </LoadingButton>
      </StyledLogoutSection>
      <AppSnackbar
        open={open}
        message={message}
        duration={duration}
        severity={severity}
        onClose={closeMessage}
      />
    </>
  );
};

export default LogoutSection;
