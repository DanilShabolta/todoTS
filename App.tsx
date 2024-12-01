import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./src/style.css";
import TaskManager from "./src/components/TaskManager";
import store from "./src/components/redux/store";
import { Provider } from "react-redux";

// Определите типы для ваших компонентов, если это необходимо

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <TaskManager />
    </Provider>
  </StrictMode>
);
