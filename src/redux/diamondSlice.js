import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  diamonds: [],
  selectedDiamond: null,
  loading: false,
  error: null,
};

const diamondSlice = createSlice({
  name: "diamond",
  initialState,
  reducers: {
    setDiamonds: (state, action) => {
      state.diamonds = action.payload;
      state.loading = false;
      state.error = null;
    },

    setSelectedDiamond: (state, action) => {
      state.selectedDiamond = action.payload;
    },

    setLoading: (state) => {
      state.loading = true;
    },

    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearDiamonds: (state) => {
      state.diamonds = [];
      state.selectedDiamond = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setDiamonds, setSelectedDiamond, setLoading, setError, clearDiamonds,} = diamondSlice.actions;
export default diamondSlice.reducer;
