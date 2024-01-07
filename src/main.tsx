import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { HashRouter } from "react-router-dom";
import "./index.css";
import Loader from "./common/components/Loader.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <App />
    <Loader />
  </HashRouter>
);
