import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./slices/categoriesSlice";
// import logger from "redux-logger";


export const store = configureStore({
  reducer: {
    categories: categoriesReducer
  },
  // Applying Logger Middleware
  // middleware: () => [logger]
})