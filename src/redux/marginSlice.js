import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  margins: [],
  loading: false,
  error: null,
  success: false,
};

const marginSlice = createSlice({
  name: "margin",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },

    setMargins: (state, action) => {
      state.margins = action.payload;
      state.loading = false;
    },

    addMarginSuccess: (state, action) => {
      state.margins.push(action.payload);
      state.loading = false;
      state.success = true;
    },

    setMarginError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },

    resetMarginStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
});

export const { 
  startLoading, 
  setMargins, 
  addMarginSuccess, 
  setMarginError, 
  resetMarginStatus 
} = marginSlice.actions;

export default marginSlice.reducer;
