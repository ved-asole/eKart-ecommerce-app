import { createSlice } from "@reduxjs/toolkit"
import fetchData, { postData, updateData } from "../../util/DataFetcher";
import { showToast } from "../../util/appUtil";

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
        // const ordersJSON = JSON.stringify(data.content);
        // localStorage.setItem('orders', ordersJSON);
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

export const updateOrder = (dispatch, cartItem) => {
  if (document.cookie.includes('customerId')
    // || localStorage.getItem('cartId')
  ) {
    // console.log("updateItemInCart : cartItem : " + JSON.stringify(cartItem));
    // console.log("updateItemInCart : cartItem : " + { ...cartItem, cartId: localStorage.getItem('cartId') });
    updateData(
      `shopping-cart/${localStorage.getItem('cartId')}/items`,
      { ...cartItem, cartId: localStorage.getItem('cartId') },
      (data) => {
        dispatch(updateCart(data));
      },
      (error) => {
        console.log(error);
      }
    )
  } else {
    dispatch(updateCart(cartItem));
  }
  showToast("Cart Updated");
}

export const { fetchOrdersRequest, fetchOrdersSuccess, fetchOrdersFailure } = orderSlice.actions;

export default orderSlice.reducer;