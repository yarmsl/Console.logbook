import { ReactElement } from "react";
import { Box, Snackbar, Typography } from "@material-ui/core";
import ErrorRoundedIcon from "@material-ui/icons/ErrorRounded";
import ThumbUpAltRoundedIcon from "@material-ui/icons/ThumbUpAltRounded";
import WarningRoundedIcon from "@material-ui/icons/WarningRounded";
import { RESET_SNACKBAR } from "../lib/constants";
import { useAppDispatch } from "../lib/hooks/redux.hooks";

export interface SnackProps {
  open: boolean;
  type: "alert" | "success" | "warning" | undefined;
  message: string;
}

const styles = {
  snack: {
    display: "flex",
    width: "100%",
    height: "100%",
    p: "8px 16px",
    borderRadius: "8px",
    mb: "56px",
  } as const,
  alert: {
    bgcolor: "error.main",
  },
  success: {
    bgcolor: "success.main",
  },
  warning: {
    bgcolor: "warning.main",
  },
  message: {
    color: "secondary.contrastText",
    userSelect: "none",
    mr: "4px",
  } as const,
};

const Snack = ({ open, type, message }: SnackProps): ReactElement => {
  const dispatch = useAppDispatch();

  return (
    <Snackbar
      open={open}
      onClose={() => dispatch({ type: RESET_SNACKBAR })}
      autoHideDuration={3500}>
      <div>
        {type === "alert" && (
          <Box sx={{ ...styles.snack, ...styles.alert }}>
            <ErrorRoundedIcon sx={styles.message} />
            <Typography sx={styles.message}>{message}</Typography>
          </Box>
        )}
        {type === "success" && (
          <Box sx={{ ...styles.snack, ...styles.success }}>
            <ThumbUpAltRoundedIcon sx={styles.message} />
            <Typography sx={styles.message}>{message}</Typography>
          </Box>
        )}
        {type === "warning" && (
          <Box sx={{ ...styles.snack, ...styles.warning }}>
            <WarningRoundedIcon sx={styles.message} />
            <Typography sx={styles.message}>{message}</Typography>
          </Box>
        )}
        {type === undefined && <Box>err</Box>}
      </div>
    </Snackbar>
  );
};

export default Snack;
