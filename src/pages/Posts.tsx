import { ReactElement } from "react";
import { useHistory } from "react-router";
import HelmetLayout from "../layouts/HelmetLayout";
import { useAppSelector } from "../lib/hooks/redux.hooks";
import { FabAdd } from "../UI/FAB";

const Posts = (): ReactElement => {
  const router = useHistory();
  const { isLoading, posts } = useAppSelector((st) => st.posts);
  console.log(isLoading);
  console.log(posts);
  return (
    <HelmetLayout title="Posts">
      Posts
      <FabAdd onClick={() => router.push("/addPost")} />
    </HelmetLayout>
  );
};

export default Posts;
