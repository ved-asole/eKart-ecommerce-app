import { createSlice } from "@reduxjs/toolkit"
import fetchData, { updateData } from "../../util/DataFetcher.js";
import { showToast } from "../../util/appUtil.js";

const initialState = {
  loading: false,
  orders: [],
  page: 0,
  size: 5,
  totalPages: 0,
  totalElements: 0,
  error: ''
}

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    fetchOrdersRequest: (state) => {
      state.loading = true
      state.error = '';
    },
    fetchOrdersSuccess: (state, action) => {
      state.loading = false;
      if (action.payload.content) state.orders = action.payload.content
      else state.orders = action.payload;
      if (action.payload.page) state.page = action.payload.page;
      if (action.payload.size) state.size = action.payload.size;
      if (action.payload.totalPages) state.totalPages = action.payload.totalPages;
      if (action.payload.totalElements) state.totalElements = action.payload.totalElements;
    },
    fetchOrdersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload
      state.orders = []
      state.page = 0
      state.size = 5
      state.totalPages = 0
      state.totalElements = 0
    }
  }
})

export const fetchAllOrders = (page, size, sortBy, sortOrder, dispatch, navigate) => {
  if (document.cookie.includes('customerId') && localStorage.getItem('token')) {
    dispatch(fetchOrdersRequest());
    const customerId = document.cookie.split(';').find(cookie => cookie.includes('customerId'))?.split('=')?.[1];
    fetchData(
      `orders/customer/${customerId}/page?page=${page}&size=${size}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
      (data) => {
        dispatch(fetchOrdersSuccess(data));
      },
      (error) => {
        dispatch(fetchOrdersFailure(error));
      }
    )
  } else {
    showToast("Please login to proceed");
    navigate('/auth');
  }
}

export const updateOrder = (dispatch, order, orderId) => {
  if (document.cookie.includes('customerId') && localStorage.getItem('token')) {
    updateData(
      `orders/${orderId}`,
      { ...order, orderId: orderId },
      (data) => {
        dispatch(fetchOrdersSuccess(data));
        showToast("Order Updated");
      },
      (error) => {
        console.error(error);
        dispatch(fetchOrdersFailure(error));
        showToast("Order Update Failed");
      }
    )
  } else {
    dispatch(fetchOrdersFailure(order));
    showToast("Please login to proceed");
  }
}

export const { fetchOrdersRequest, fetchOrdersSuccess, fetchOrdersFailure } = orderSlice.actions;

export default orderSlice.reducer;