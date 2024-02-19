import { createSlice } from "@reduxjs/toolkit"
import fetchData from "../../util/LocalApiDataFetcher";
import { PRODUCTS_JSON_PATH } from "../../util/commonConstants";


const initialState = {
  loading: false,
  products: [],
  error: ''
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsRequest: (state) => {
      state.loading = true
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload
    }
  }
})

export const fetchProducts = (dispatch) => {

  dispatch(fetchProductsRequest());

  fetchData(
    PRODUCTS_JSON_PATH,
    (data) => dispatch(fetchProductsSuccess(data)),
    (errorMsg) => dispatch(fetchProductsFailure(errorMsg)),
  );

}

export const { fetchProductsRequest, fetchProductsSuccess, fetchProductsFailure } = productsSlice.actions

export default productsSlice.reducer;