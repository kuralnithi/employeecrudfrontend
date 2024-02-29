import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: { isValid: false },
  reducers: {
    userValid: (state, action) => {
      state.isValid = action.payload;
    },
  },
});

export const { userValid } = UserSlice.actions;

export default UserSlice.reducer;
