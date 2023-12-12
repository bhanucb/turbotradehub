import { FC, useState } from "react";
import { Alert, AlertColor, Snackbar } from "@mui/material";

export function useSnackbar() {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [duration, setDuration] = useState<number>(4000);
  const [severity, setSeverity] = useState<AlertColor>("success");

  const showMessage = (
    message: string,
    severity: AlertColor = "success",
    duration: number = 4000
  ) => {
    setMessage(message);
    setSeverity(severity);
    setDuration(duration);
    setOpen(true);
  };

  const closeMessage = () => {
    setOpen(false);
  };

  return { open, message, duration, severity, showMessage, closeMessage };
}

export type SnackbarProps = {
  open: boolean;
  message: string;
  duration: number;
  severity: AlertColor;
  onClose: () => void;
};

const AppSnackbar: FC<SnackbarProps> = (props) => {
  const { open, message, duration, severity, onClose } = props;

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={duration}
        onClose={onClose}
      >
        <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AppSnackbar;
