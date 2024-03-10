import { createSlice } from '@reduxjs/toolkit';
import { fetchLocalData } from '../../util/DataFetcher';
import { TOP_DEALS_JSON_PATH } from './../../util/commonConstants';

const initialState = {
  loading: false,
  topDeals: [],
  error: ""
}

export const topDealsSlice = createSlice({
  name: 'topDeals',
  initialState,
  reducers: {
    fetchTopDealsRequest: (state) => {
      state.loading = true
    },
    fetchTopDealsSuccess: (state, action) => {
      state.loading = false
      state.topDeals = action.payload
    },
    fetchTopDealsFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    }
  }
})

export const fetchTopDeals = (dispatch) => {

  dispatch(fetchTopDealsRequest());

  fetchLocalData(
    TOP_DEALS_JSON_PATH,
    (data) => dispatch(fetchTopDealsSuccess(data)),
    (errorMsg) => { dispatch(fetchTopDealsFailure(errorMsg)) }
  );

}

export const { fetchTopDealsRequest, fetchTopDealsSuccess, fetchTopDealsFailure } = topDealsSlice.actions
export default topDealsSlice.reducer
