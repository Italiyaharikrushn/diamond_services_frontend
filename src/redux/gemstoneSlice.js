import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gemstones: [],
  selectedGemstone: null,
  loading: false,
  error: null,
};

const gemstoneSlice = createSlice({
  name: "gemstone",
  initialState,
  reducers: {
    setGemstones: (state, action) => {
      state.gemstones = action.payload;
      state.loading = false;
      state.error = null;
    },

    setSelectedGemstone: (state, action) => {
      state.selectedGemstone = action.payload;
    },

    setLoading: (state) => {
      state.loading = true;
    },

    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearGemstones: (state) => {
      state.gemstones = [];
      state.selectedGemstone = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setGemstones, setSelectedGemstone, setLoading, setError, clearGemstones,} = gemstoneSlice.actions;
export default gemstoneSlice.reducer;