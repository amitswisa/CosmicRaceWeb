import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  counter: 12,
  isLoading: false,
  userToken: "213",
};

// createAsyncThunk - redux toolkit

const userSlice = createSlice({
  name: "user-slice",
  initialState,
  reducers: {
    incrementCounter: (state, action) => {
      console.log(action);
      state.counter = 4;
    },
    startLoading: (state, action) => {
      state.isLoading = true;
    },
    loginExecute: (state) => {
      state.isLoading = true;
      //...
      state.isLoading = false;
    },
  },
});

export const { incrementCounter, startLoading } = userSlice.actions;

export default userSlice.reducer;
