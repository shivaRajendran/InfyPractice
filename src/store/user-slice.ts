import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { IFormInput } from "../components/Registration";

type userBase = IFormInput;

type User = Omit<userBase, "dob"> & { dob: string };

type UserState = {
  users: User[];
};

const initialState: UserState = {
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addNewUser(state, action: PayloadAction<User>) {
      const itemIndex = state.users.findIndex(
        (item) => item.firstName === action.payload.firstName
      );

      if (itemIndex >= 0) {
        state.users.splice(itemIndex, 1);
        state.users.push(action.payload);
      } else {
        state.users.push(action.payload);
      }
    },
  },
});

export const { addNewUser } = userSlice.actions;
