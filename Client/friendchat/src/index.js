import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import Root from "./components/Root";
import { createStore, StoreProvider, persist } from "easy-peasy";
import Socket from "./services/socket";
import UserService from "./services/userServices";
import MessageService from "./services/messageServices";
import model from "./model";

Socket.addHandler(UserService);
Socket.addHandler(MessageService);

const store = createStore(persist(model, { allow: ["user"] }));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StoreProvider store={store}>
    <Root children={<App/> } />
  </StoreProvider>
);
