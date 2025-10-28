import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  init: null;
}

const initialState: InitialState = {
  init: null,
};
export const webContainerSlice = createSlice({
  name: "webcontainer",
  initialState,
  reducers: {},
});

export default webContainerSlice.reducer;
