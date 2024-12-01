import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import TaskManager from "./components/TaskManager";
import store from "./components/redux/store";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <TaskManager />
    </Provider>
  </StrictMode>
);
