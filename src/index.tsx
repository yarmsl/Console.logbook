import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { Provider as StoreProvider } from "react-redux";
import App from "./App";
import store, { RootState } from "./state/store";
import { signLocalToken } from "./state/actions/authActions";
import { ThunkDispatch } from "redux-thunk";

(store.dispatch as ThunkDispatch<RootState, unknown, AuthActions>)(signLocalToken())

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
