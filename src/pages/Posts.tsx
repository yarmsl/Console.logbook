import { Container, LinearProgress, makeStyles } from "@material-ui/core";
import { ReactElement } from "react";
import { useHistory } from "react-router";
import HelmetLayout from "../layouts/HelmetLayout";
import { useAppSelector } from "../lib/hooks/redux.hooks";
import { FabAdd } from "../UI/FAB";
import LogCard from "../UI/LogCard";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  loader: {
    width: "100%",
  },
}));

const Posts = (): ReactElement => {
  const classes = useStyles();
  const router = useHistory();
  const { isLoading, posts } = useAppSelector((st) => st.posts);

  return (
    <HelmetLayout title="Posts">
      <Container className={classes.root} maxWidth="sm">
        {isLoading && (
          <LinearProgress className={classes.loader} color="secondary" />
        )}
        {posts?.map((post) => (
          <LogCard key={post.id} {...post} />
        ))}
      </Container>
      <FabAdd onClick={() => router.push("/addPost")} />
    </HelmetLayout>
  );
};

export default Posts;
