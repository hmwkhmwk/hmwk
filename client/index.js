import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import history from "./history";
import store from "./store";
import App from "./app";
import { HashRouter } from "react-router-dom";

// establishes socket connection
// import './socket'

ReactDOM.render(
  // <Provider store={store}>

  <HashRouter history={history}>
    <App />
  </HashRouter>,
  document.getElementById("app")
);
