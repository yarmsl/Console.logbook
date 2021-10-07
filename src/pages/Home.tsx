import { ReactElement } from "react";
import HelmetTitle from "../layouts/Helmet";
import { FabAdd } from "../UI/FAB";
import { useHistory } from "react-router-dom";

const Home = (): ReactElement => {
  const router = useHistory();
  return (
    <>
      <HelmetTitle title="main" />
      <FabAdd onClick={() => router.push("/addPost")} />
    </>
  );
};

export default Home;
