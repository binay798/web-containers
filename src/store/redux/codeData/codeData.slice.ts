import { createSlice } from "@reduxjs/toolkit";
import type { Directory } from "../../../components/sidebarFileManager/utils/fileManager";
import type { FileSystemTree } from "../../../components/webcontainer/webcontainer.types";

interface InitialState {
  monacoEditorCodeData: Directory | null;
  webContainerCodeData: FileSystemTree | null;
}

const initialState: InitialState = {
  monacoEditorCodeData: null,
  webContainerCodeData: null,
};

export const codeDataSlice = createSlice({
  name: "codeSlice",
  initialState,
  reducers: {
    setMonacoEditorCodeData: (state, action: { payload: Directory }) => {
      state.monacoEditorCodeData = action.payload;
    },
    setWebContainerCodeData: (state, action: { payload: FileSystemTree }) => {
      state.webContainerCodeData = action.payload;
    },
  },
});

export const { setMonacoEditorCodeData, setWebContainerCodeData } =
  codeDataSlice.actions;

export default codeDataSlice.reducer;
