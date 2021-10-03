import { ReactElement } from "react";
import { useRoutes } from "./Routes";
import MainLayout from "./layouts/MainLayout";
import { CssBaseline } from "@material-ui/core";
import ThemesProvider from "./lib/context/ThemeCTX";
import { BrowserRouter as Router } from "react-router-dom";
import { useAppSelector } from "./lib/hooks/redux.hooks";

const App = (): ReactElement => {
  const { isAuth } = useAppSelector((state) => state.auth);
  const routes = useRoutes(isAuth);
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
