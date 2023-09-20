import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {
      username: '用户名',
      nickname: '昵称',
      role: '角色'
    },
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
  }
})
// 每个 case reducer 函数会生成对应的 Action creators
export const {
  updateUser,
  displayUserDetailModel,
  closeUserDetailModel
} = userSlice.actions

export default userSlice.reducer
