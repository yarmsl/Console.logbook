import { ReactElement, useEffect } from "react";
import { useRoutes } from "./Routes";
import MainLayout from "./layouts/MainLayout";
import { CssBaseline } from "@material-ui/core";
import ThemesProvider from "./lib/context/ThemeCTX";
import { BrowserRouter as Router } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./lib/hooks/redux.hooks";
import { getPosts } from "./state/actions/postsActions";

const App = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { isAuth, token } = useAppSelector((state) => state.auth);
  const routes = useRoutes(isAuth);
  useEffect(() => {
	console.log("useEffect Posts");
    if (token) {
      console.log("query Posts");
      dispatch(getPosts(token));
    }
  }, [token]);
  return (
    <ThemesProvider>
      <CssBaseline />
      <Router>
        <MainLayout>{routes}</MainLayout>
      </Router>
    </ThemesProvider>
  );
};

export default App;
