import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getTasksFromLocalStorage,
  saveTaskToLocalStorage,
} from "../utils/TaskStorage";

interface Todo {
  id: number;
  index: number;
  title: string;
  text: string;
  isPinned?: boolean;
}

interface TodoState extends Array<Todo> {}

const todoSlice = createSlice({
  name: "todos",
  initialState: getTasksFromLocalStorage() as TodoState,
  reducers: {
    addTodo: (state, action: PayloadAction<Omit<Todo, "id" | "index">>) => {
      const newTask: Todo = {
        ...action.payload,
        id: new Date().getTime(),
        index: state.length,
      };
      state.push(newTask);
      saveTaskToLocalStorage(state);
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      const newState = state.filter((todo) => todo.id !== action.payload);
      saveTaskToLocalStorage(newState);
      return newState;
    },
    editTask: (state, action: PayloadAction<Todo>) => {
      const index = state.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
        saveTaskToLocalStorage(state);
      }
    },
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      return action.payload;
    },
    moveTask: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const [movedTask] = state.splice(fromIndex, 1);
      state.splice(toIndex, 0, movedTask);
      saveTaskToLocalStorage(state);
    },
    pinTask: (state, action: PayloadAction<Todo>) => {
      const task = state.find((task) => task.id === action.payload.id);
      if (task && !task.isPinned) {
        const pinnedTasksCount = state.filter((task) => task.isPinned).length;
        if (pinnedTasksCount < 3) {
          task.isPinned = true;
        } else {
          console.log(task.title + ": закреплено максимум задач");
        }
      }
    },
    unpinTask: (state, action: PayloadAction<Todo>) => {
      const task = state.find((task) => task.id === action.payload.id);
      if (task) {
        task.isPinned = false;
      }
    },
  },
});

export const {
  addTodo,
  removeTodo,
  setTodos,
  moveTask,
  editTask,
  pinTask,
  unpinTask,
} = todoSlice.actions;
export default todoSlice.reducer;
