import { configureStore } from "@reduxjs/toolkit";
import editorReducer from "./redux/editor/editor.slice";

export const store = configureStore({
  reducer: { editor: editorReducer },
});
