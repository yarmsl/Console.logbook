import { Container, LinearProgress } from "@mui/material";
import { ReactElement, useEffect } from "react";
import { useHistory } from "react-router";
import HelmetTitle from "../layouts/Helmet";
import { useAppDispatch, useAppSelector } from "../store";
import { setPosts, useGetPostsQuery} from "../store/Posts";
import { FabAdd } from "../UI/FAB";
import LogCard from "../UI/LogCard";

const styles = {
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "auto",
    py: "50px",
  } as const,
  loader: {
    width: "100%",
  },
};

const Posts = (): ReactElement => {
  const router = useHistory();
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector((st) => st.posts);
  const { data, isLoading } = useGetPostsQuery("", {
    skip: posts?.length > 0,
  });

  useEffect(() => {
    if (data) {
      dispatch(setPosts(data));
    }
  }, [data]);

  return (
    <>
      <HelmetTitle title="Posts" />
      <Container sx={styles.root} maxWidth={false}>
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
