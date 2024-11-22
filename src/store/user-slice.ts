import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { IFormInput } from "../components/Registration";
import dummyData from "./DummyData";

type userBase = IFormInput;

export type User = Omit<userBase, "dob"> & {dob: string};

type UserState = {
  users: User[];
};
const initialState: UserState = {
  users: dummyData
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
