import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  // Placeholder — auth reducers and state shape will be added in a later phase.
}

const initialState: AuthState = {};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export default authSlice.reducer;
