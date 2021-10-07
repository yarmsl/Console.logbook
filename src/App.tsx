import { ReactElement, useEffect } from "react";
import { useRoutes } from "./Routes";
import MainLayout from "./layouts/MainLayout";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./lib/hooks/redux.hooks";
import { getPosts } from "./state/actions/postsActions";
import theme from './UI/theme';

const App = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { isAuth, token } = useAppSelector((state) => state.auth);
  const routes = useRoutes(isAuth);

  useEffect(() => {
    if (token) {
      dispatch(getPosts(token));
    }
  }, [token]);
  
  return (
	<ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <MainLayout>{routes}</MainLayout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
