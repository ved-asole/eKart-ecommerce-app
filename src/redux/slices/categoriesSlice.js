import { createSlice } from "@reduxjs/toolkit"
import fetchData from "../../util/ApiDataFetcher"

const initialState = {
  loading: false,
  categories: [],
  error: ""
}

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    fetchCategoriesRequest: (state) => {
      state.loading = true
    },
    fetchCategoriesSuccess: (state, action) => {
      state.loading = false
      state.categories = action.payload
    },
    fetchCategoriesFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    }
  }
})

export const fetchCategories = (dispatch, path) => {

  dispatch(fetchCategoriesRequest());

  const dataFetchSuccessful = fetchData(
    path,
    (data) => { dispatch(fetchCategoriesSuccess(data.categories)) },
    (errorMsg) => { dispatch(fetchCategoriesFailure(errorMsg)) }
  );

  console.log("dataFetchSuccessful : " + dataFetchSuccessful);
}

export const { fetchCategoriesRequest, fetchCategoriesSuccess, fetchCategoriesFailure } = categoriesSlice.actions

export default categoriesSlice.reducer