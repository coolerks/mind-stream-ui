import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {getMenus} from "../../api/menu.js";

export const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    menus: [],
    remoteMenuMap: {},
    loadComplete: false
  },
  reducers: {
  },
  extraReducers(builder) {
    builder.addCase(fetchMenus.fulfilled, (state, action) => {
      state.menus = action.payload;
      const map = {};
      function mapMenu(list) {
        list.forEach(it => {
          map[it.path] = true;
          mapMenu(it.routes);
        })
      }
      mapMenu(action.payload);
      state.remoteMenuMap = map;
      state.loadComplete = true;
    })
  }
})

export const fetchMenus = createAsyncThunk(
  'menu/fetchMenus',
  async () => {
    return await getMenus();
  }
)

// 每个 case reducer 函数会生成对应的 Action creators
export const {} = menuSlice.actions

export default menuSlice.reducer

