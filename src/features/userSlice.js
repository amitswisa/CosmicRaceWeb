import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {
    coins: 0,
  },
};

// createAsyncThunk - redux toolkit

const userSlice = createSlice({
  name: "user-slice",
  initialState,
  reducers: {
    update: (state, action) => {
      state.userData.coins = action.payload.coins;
    },
  },
});

export const { update } = userSlice.actions;

export default userSlice.reducer;
