import { createSlice } from "@reduxjs/toolkit";
import type { File } from "../../../components/sidebarFileManager/utils/fileManager";

interface InitialState {
  activeFile: File | null;
  openTabFiles: File[] | null;
}
const initialState: InitialState = {
  activeFile: null,
  openTabFiles: null,
};
const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setActiveFileReducer: (state, action: { payload: File }) => {
      state.activeFile = action.payload;
    },
    addTabFile: (state, action: { payload: File }) => {
      const alreadyExist =
        state.openTabFiles?.filter((el) => el.id === action.payload.id) ?? [];
      if (alreadyExist?.length === 0) {
        // ADD
        if (state.openTabFiles === null) {
          state.openTabFiles = [action.payload];
        } else {
          state.openTabFiles.push(action.payload);
        }
      }
      if (state.openTabFiles && state.openTabFiles?.length > 4) {
        state.openTabFiles?.shift();
      }
      state.activeFile = action.payload;
    },
    removeTabFile: (state, action: { payload: string }) => {
      const index = state.openTabFiles?.findIndex(
        (el) => el.id === action.payload
      );
      if (index !== -1) {
        if (index !== undefined) {
          state.openTabFiles?.splice(index, 1);
          // SET NEW ACTIVE FILE IF FILES EXIST
          if (state.openTabFiles?.length) {
            state.activeFile =
              state.openTabFiles[state.openTabFiles?.length - 1];
          } else {
            state.activeFile = null;
          }
        }
      }
    },
  },
});

export const { setActiveFileReducer, addTabFile, removeTabFile } =
  editorSlice.actions;
export default editorSlice.reducer;
