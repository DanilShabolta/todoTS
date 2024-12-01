import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./todoSlice";

const store = configureStore({
  reducer: {
    todos: rootReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
