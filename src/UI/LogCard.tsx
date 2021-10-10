import {
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";

const styles = {
  root: {
    width: "100%",
    height: 'auto'
  },
};

const LogCard = (data: PostModel): JSX.Element => {
  return (
    <Card color="secondary" sx={styles.root}>
      <CardHeader title={data.title} />
      <CardContent>
        <Typography component="pre">{data.text}</Typography>
        <Typography>{data.date.toISOString()}</Typography>
      </CardContent>
    </Card>
  );
};

export default LogCard;
