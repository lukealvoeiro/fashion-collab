//import "materialize-css/dist/css/materialize.min.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "./styles.scss";

import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "./store";

// import App from "./components/App";
import App2 from "./components/App2";

//development only, axios helpers
import axios from "axios";
window.axios = axios;

ReactDOM.render(
  <Provider store={store}>
    <App2 />
  </Provider>,
  document.querySelector("#root")
);
