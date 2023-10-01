import {createSlice} from '@reduxjs/toolkit'


export const roleSlice = createSlice({
  name: 'role',
  initialState: {
    roleDetail: {
      display: false,
      id: '0',
      count: 0
    },
    roleAdd: {
      display: false
    }
  },
  reducers: {
    openRoleDetailModal(state, action) {
      state.roleDetail.id = action.payload;
      state.roleDetail.display = true;
      state.roleDetail.count++;
    },
    closeRoleDetailModal(state) {
      state.roleDetail.display = false;
      state.roleDetail.count--;
    },
    closeRoleAddModal(state) {
      state.roleAdd.display = true;
    }
  }
})
export const {
  openRoleDetailModal,
  closeRoleDetailModal
} = roleSlice.actions

export default roleSlice.reducer
