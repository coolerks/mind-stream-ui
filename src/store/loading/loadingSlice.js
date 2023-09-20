import {createSlice} from '@reduxjs/toolkit'


export const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    value: {
      count: 0,
      isLoading: false
    }
  },
  reducers: {
    startLoading(state) {
      state.value.count++;
      state.value.isLoading = true;
    },
    endLoading(state) {
      if (--state.value.count === 0) {
        state.value.isLoading = false;
      }
    }
  }
})
// 每个 case reducer 函数会生成对应的 Action creators
export const {startLoading, endLoading} = loadingSlice.actions

export default loadingSlice.reducer
