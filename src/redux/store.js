import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./slices/categoriesSlice";
import topDealsReducer from "./slices/topDealsSlice";
// import logger from "redux-logger";


export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    topDeals: topDealsReducer,
  },
  // Applying Logger Middleware
  // middleware: () => [logger]
})