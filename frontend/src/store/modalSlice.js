import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playerModalStatus: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openPlayerModal: (state) => {
      state.playerModalStatus = true;
    },
    closePlayerModal: (state) => {
      state.playerModalStatus = false;
    },
  },
});

export const { openPlayerModal, closePlayerModal } = modalSlice.actions;

export default modalSlice.reducer;
