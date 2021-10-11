import { Box, Typography } from "@mui/material";

const styles = {
  root: {
    width: '100%',
    maxWidth: "520px",
    border: "1px solid black",
  },
};

const LogCard = (data: PostModel): JSX.Element => {
  return (
    <Box color="secondary" sx={styles.root}>
      <Typography variant="h4">{data.title}</Typography>
      <Typography component="pre">{data.text}</Typography>
      <Typography>{data.date.toISOString()}</Typography>
    </Box>
  );
};

export default LogCard;
