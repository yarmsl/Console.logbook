import { MouseEventHandler } from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export interface FabProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const styles = {
  fab: {
    position: "fixed",
    bottom: '70px',
    right: '12px',
  } as const,
};

export const FabAdd = ({ onClick }: FabProps): JSX.Element => {
  return (
    <Fab onClick={onClick} color="secondary" sx={styles.fab}>
      <AddIcon />
    </Fab>
  );
};
