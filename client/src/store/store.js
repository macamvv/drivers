import { configureStore } from "@reduxjs/toolkit";
import { mainSlice } from "../features/mainSlice";

export const store = configureStore({
  reducer:{
    mainData: mainSlice.reducer,
  }
})