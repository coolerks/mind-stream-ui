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
    },
    assignPermissions: {
      display: false,
      id: '0'
    },
    assignMenus: {
      display: false,
      id: '0'
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
    },
    displayAssignPermissionModal(state, action) {
      state.assignPermissions.display = true;
      state.assignPermissions.id = action.payload;
    },
    closeAssignPermissionModal(state) {
      state.assignPermissions.display = false;
    },
    displayAssignMenusModal(state, action) {
      state.assignMenus.id = action.payload;
      state.assignMenus.display = true;
    },
    closeAssignMenusModal(state) {
      state.assignMenus.display = false;
    }
  }
})
export const {
  openRoleDetailModal,
  closeRoleDetailModal,
  displayAssignPermissionModal,
  closeAssignPermissionModal,
  displayAssignMenusModal,
  closeAssignMenusModal
} = roleSlice.actions

export default roleSlice.reducer
