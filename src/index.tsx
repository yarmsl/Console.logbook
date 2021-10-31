import React from "react";
import ReactDOM from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import reportWebVitals from "./reportWebVitals";
import { Provider as StoreProvider } from "react-redux";
import App from "./App";
import appStore from './store'
import { tryToReadTokenFromLC } from "./lib/localStorage";
import { setAuth } from "./store/Auth/Auth.reducer";

const token = tryToReadTokenFromLC();
if (token != null) appStore.dispatch(setAuth(token))

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={appStore}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
