import {configureStore} from '@reduxjs/toolkit'
import counterReducer from "./features/counter/counterSlice";
import userReducer from './user/userSlice'
import loadingReducer from './loading/loadingSlice.js'
import roleReducer from './role/roleSlice.js'
import menuReducer from './menu/menuSlice.js'

export default configureStore({
  reducer: {
    count: counterReducer,
    user: userReducer,
    loading: loadingReducer,
    role: roleReducer,
    menu: menuReducer
  }
})
