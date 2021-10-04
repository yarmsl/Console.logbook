import {
  Card,
  CardContent,
  CardHeader,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    height: 'auto'
  },
}));

const LogCard = (data: PostModel): JSX.Element => {
  const classes = useStyles();
  return (
    <Card color="secondary" className={classes.root}>
      <CardHeader title={data.title} />
      <CardContent>
        <Typography component="pre">{data.text}</Typography>
        <Typography>{data.date.toISOString()}</Typography>
      </CardContent>
    </Card>
  );
};

export default LogCard;
