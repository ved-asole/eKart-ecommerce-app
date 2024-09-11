import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./slices/categoriesSlice";
import topDealsReducer from "./slices/topDealsSlice";
import productsReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
// import logger from "redux-logger";


export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    topDeals: topDealsReducer,
    products: productsReducer,
    cart: cartReducer,
    orders: orderReducer
  },
  // Applying Logger Middleware
  // middleware: () => [logger]
})