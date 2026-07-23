import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  // Placeholder — UI reducers and state shape will be added as features are built.
  sidebarOpen: boolean;
}

const initialState: UiState = {
  sidebarOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSidebarOpen(state, action: PayloadAction<boolean>) {
      state.sidebarOpen = action.payload;
    },
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
});

export const { setSidebarOpen, toggleSidebar } = uiSlice.actions;
export default uiSlice.reducer;
