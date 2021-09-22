import { createSlice } from "@reduxjs/toolkit";

const initialSate = {
  isAuthenticated: false,
  token: "NA",
};
const authSlice = createSlice({
  name: "authentication",
  initialState: initialSate,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
