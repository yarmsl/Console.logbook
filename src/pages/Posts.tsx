import { Container, LinearProgress } from "@mui/material";
import { ReactElement } from "react";
import { useHistory } from "react-router";
import HelmetTitle from "../layouts/Helmet";
import { useAppSelector } from "../lib/hooks/redux.hooks";
import { FabAdd } from "../UI/FAB";
import LogCard from "../UI/LogCard";

const styles = {
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: 'auto',
    py: "50px",
  } as const,
  loader: {
    width: "100%",
  },
};

const Posts = (): ReactElement => {
  const router = useHistory();
  const { isLoading, posts } = useAppSelector((st) => st.posts);

  return (
    <>
      <HelmetTitle title="Posts" />
      <Container sx={styles.root} >
        {isLoading && <LinearProgress sx={styles.loader} color="secondary" />}
        {posts?.map((post, i) => (
          <LogCard key={`post-${i}`} {...post} />
        ))}
      </Container>
      <FabAdd onClick={() => router.push("/addPost")} />
    </>
  );
};

export default Posts;
