import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IUser = {
  id: "",
  name: "",
  avatar: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      Object.assign(state, action.payload);
    },
    setUserId(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
    resetUser(state) {
      Object.assign(state, initialState);
    },
  },
});
export const { setUser, setUserId, resetUser } = userSlice.actions;
export const { reducer: userReducer } = userSlice;
