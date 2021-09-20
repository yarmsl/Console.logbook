import React, { ReactElement } from "react";
import { useRoutes } from "./Routes";
import MainLayout from "./layouts/MainLayout";
import { CssBaseline } from "@material-ui/core";
import ThemesProvider from "./lib/context/ThemeCTX";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuthCtx } from "./lib/context/AuthCTX";

const App = (): ReactElement => {
  const { isAuth } = useAuthCtx();
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
