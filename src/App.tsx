import { ReactElement, useEffect, useMemo } from "react";
import { useRoutes } from "./Routes";
import MainLayout from "./layouts/MainLayout";
import {
  CssBaseline,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import theme from "./UI/theme";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { useCheckAuthQuery } from "./store/Auth/Auth.service";
import { setUser } from "./store/User/User.reducer";

const App = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { isAuth, token } = useAppSelector((st) => st.auth);
  const id = useAppSelector((st) => st.user.id);
  const routes = useRoutes(isAuth);
  const skipQuery = useMemo(() => !token || !!id, [token, id]);
  const { data, error } = useCheckAuthQuery("", { skip: skipQuery });

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data]);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <MainLayout>{routes}</MainLayout>
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
