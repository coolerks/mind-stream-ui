import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getLoginUser} from "../../api/account.js";

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {},
    userDetail: {
      display: false,
      id: '0'
    }
  },
  reducers: {
    updateUser: (state, action) => {
      state.userInfo = action.payload;
    },
    displayUserDetailModel: (state, action) => {
      state.userDetail.id = action.payload;
      state.userDetail.display = true;
    },
    closeUserDetailModel: state => {
      state.userDetail.display = false
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.userInfo = action.payload;
      console.log(action.payload)
    })
  }
})

export const fetchUserInfo = createAsyncThunk("user/getLoginUser",
  async () => {
    return await getLoginUser();
  }
);


// 每个 case reducer 函数会生成对应的 Action creators
export const {
  updateUser,
  displayUserDetailModel,
  closeUserDetailModel
} = userSlice.actions

export default userSlice.reducer
