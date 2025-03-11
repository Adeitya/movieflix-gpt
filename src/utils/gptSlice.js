import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gptSlice",
  initialState: {
    showGptSearch: false,
    gptMovieResult: null,
    gptMovieNames: null,
    showLoading: false,
  },
  reducers: {
    toggleShowLoading: (state) => {
      state.showLoading = true;
    },
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMovieResult: (state, action) => {
      const { movieNames, movieDetailsList } = action.payload;
      state.gptMovieResult = movieDetailsList;
      state.gptMovieNames = movieNames;
      state.showLoading = false;
    },
  },
});

export const { toggleGptSearchView, addGptMovieResult, toggleShowLoading } =
  gptSlice.actions;

export default gptSlice.reducer;
