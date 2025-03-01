import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import modalSlice from "./modalSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    modal: modalSlice,
  },
});

export default store;
