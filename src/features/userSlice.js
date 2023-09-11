import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {
    coins: 0,
    wins: 0,
    loses: 0,
    level: 0,
    xp: 0,
  },
};

// createAsyncThunk - redux toolkit

const userSlice = createSlice({
  name: "user-slice",
  initialState,
  reducers: {
    update: (state, action) => {
      state.userData.coins = action.payload.coins;
      state.userData.wins = action.payload.wins;
      state.userData.loses = action.payload.loses;
      state.userData.xp = action.payload.xp;
      state.userData.level = action.payload.level;
    },
  },
});

export const { update } = userSlice.actions;

export default userSlice.reducer;
