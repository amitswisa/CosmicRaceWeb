import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playSettings: {
    isPlaying: false,
    roomNumber: "",
  },
};

// createAsyncThunk - redux toolkit

const userSlice = createSlice({
  name: "user-slice",
  initialState,
  reducers: {
    play: (state, action) => {
      state.playSettings.isPlaying = true;
      state.playSettings.roomNumber = action.payload.roomNumber;
    },
    stop: (state) => {
      state.playSettings.isPlaying = false;
      state.playSettings.roomNumber = "";
    },
  },
});

export const { play, stop } = userSlice.actions;

export default userSlice.reducer;
