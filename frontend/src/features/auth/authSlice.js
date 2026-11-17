
import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./authThunks";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: null,
    loading: false,
    error: null
  },

  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.user = null;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }

});

export const { loginSuccess, logout } = authSlice.actions;
export const selectCurrentUser = (state) => state.auth.user;

export default authSlice.reducer;
