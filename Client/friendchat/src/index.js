import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import Root from "./components/Root";
import { createStore, StoreProvider } from "easy-peasy";
import model from "./model";

const store = createStore(model);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StoreProvider store={store}>
    <Root children={<App/> } />
  </StoreProvider>
);
