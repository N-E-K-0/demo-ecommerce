import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  // Ensure localStorage access is only in the browser
  if (typeof window !== "undefined") {
    return {
      accessToken: localStorage.getItem("access_token") || null,
      refreshToken: localStorage.getItem("refresh_token") || null,
      isAuthenticated: !!localStorage.getItem("access_token"),
    };
  }
  return {
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
  };
};

const initialState = getInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthTokens: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;

      // Ensure localStorage access is only in the browser
      if (typeof window !== "undefined") {
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
      }
    },
    logOut: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;

      // Ensure localStorage access is only in the browser
      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      }
    },
  },
});

export const { setAuthTokens, logOut } = authSlice.actions;

export default authSlice.reducer;
