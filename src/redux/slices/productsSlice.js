import { createSlice } from "@reduxjs/toolkit"
import fetchData from "../../util/DataFetcher";
import { PRODUCTS_JSON_PATH } from "../../util/commonConstants";

const initialState = {
  loading: false,
  products: [],
  page: 0,
  size: 12,
  totalPages: 0,
  error: ''
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsRequest: (state) => {
      state.loading = true
      state.error = '';
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      if (action.payload.content) state.products = action.payload.content
      else state.products = action.payload;
      if (action.payload.page) state.page = action.payload.page;
      if (action.payload.size) state.size = action.payload.size;
      if (action.payload.totalPages) state.totalPages = action.payload.totalPages;
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload
      state.products = []
      state.page = 0
      state.size = 12
      state.totalPages = 0
    }
  }
})

export const fetchProducts = (dispatch) => {

  dispatch(fetchProductsRequest());

  fetchData(
    PRODUCTS_JSON_PATH,
    (data) => dispatch(fetchProductsSuccess(data)),
    (errorMsg) => dispatch(fetchProductsFailure(errorMsg)),
    "products"
  );

}

export const fetchProductsPage = (dispatch, page, size, sortBy, sortOrder) => {

  dispatch(fetchProductsRequest());

  fetchData(
    PRODUCTS_JSON_PATH + `/page?page=${page}&size=${size}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
    (data) => dispatch(fetchProductsSuccess(data)),
    (errorMsg) => dispatch(fetchProductsFailure(errorMsg))
  );

}

export const fetchProductsByCategory = (dispatch, categoryId) => {

  dispatch(fetchProductsRequest());

  fetchData(
    `${PRODUCTS_JSON_PATH}/category/${categoryId}`,
    (data) => {
      if (data == undefined) dispatch(fetchProductsFailure("No data found"))
      else dispatch(fetchProductsSuccess(data)
      )
    },
    (errorMsg) => {
      dispatch(fetchProductsFailure(errorMsg))
    },
    "products"
  )
}


export const { fetchProductsRequest, fetchProductsSuccess, fetchProductsFailure } = productsSlice.actions

export default productsSlice.reducer;