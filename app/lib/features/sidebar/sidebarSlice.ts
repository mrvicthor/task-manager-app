import { createSlice } from "@reduxjs/toolkit";

export interface SidebarState {
  hideSidebar: boolean;
}

const initialState: SidebarState = {
  hideSidebar: false,
};

export const SidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.hideSidebar = !state.hideSidebar;
    },
  },
});

export const { toggleSidebar } = SidebarSlice.actions;
export default SidebarSlice.reducer;
