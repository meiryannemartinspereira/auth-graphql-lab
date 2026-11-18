
import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./authThunks";

const initialState = {
  user: null,
  loading: false,
  error: null
};

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.error.message;
};

const authSlice = createSlice({
  name: "auth",
  initialState,

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
      .addCase(loginUser.pending, handlePending)
      .addCase(registerUser.pending, handlePending)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(loginUser.rejected, handleRejected)
      .addCase(registerUser.rejected, handleRejected);
  }
});

export const { loginSuccess, logout } = authSlice.actions;
export const selectCurrentUser = (state) => state.auth.user;

export default authSlice.reducer;
