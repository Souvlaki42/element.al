/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import App from "./App";

const root = document.querySelector("#root");

if (!root) {
  alert("Root element is missing. Refresh the page or contact the developer!");
  throw new Error(
    "Root element is missing. Refresh the page or contact the developer!",
  );
}

render(() => <App />, root);
