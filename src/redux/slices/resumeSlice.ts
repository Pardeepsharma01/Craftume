import { createSlice } from "@reduxjs/toolkit";

interface ResumeState {
  // Placeholder — resume reducers and state shape will be added in a later phase.
}

const initialState: ResumeState = {};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {},
});

export default resumeSlice.reducer;
