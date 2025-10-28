import { configureStore } from "@reduxjs/toolkit";
import editorReducer from "./redux/editor/editor.slice";
import webContainerReducer from "./redux/webContainer/webContainer.slice";
import codeDataReducer from "./redux/codeData/codeData.slice";

export const store = configureStore({
  reducer: {
    editor: editorReducer,
    webContainer: webContainerReducer,
    codeData: codeDataReducer,
  },
});
