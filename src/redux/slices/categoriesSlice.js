import { createSlice } from "@reduxjs/toolkit"
import fetchData from "../../util/DataFetcher"
import { CATEGORIES_JSON_PATH } from "../../util/commonConstants"

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

export const fetchCategories = (dispatch) => {

  dispatch(fetchCategoriesRequest());

  fetchData(
    CATEGORIES_JSON_PATH,
    (data) => { dispatch(fetchCategoriesSuccess(data)) },
    (errorMsg) => { dispatch(fetchCategoriesFailure(errorMsg)) },
    "categories"
  );
}

export const { fetchCategoriesRequest, fetchCategoriesSuccess, fetchCategoriesFailure } = categoriesSlice.actions

export default categoriesSlice.reducer