import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

export interface UserType {
  firstName: string;
  email: string;
  token: string;
  lastName: string;
  role: string;
}

export interface UserState {
  user: UserType;
}

const initialState: UserState = {
  user: {
    firstName: '',
    lastName: '',
    token: '',
    email: '',
    role: '',
  },
};
const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const userSelector = (state: RootState) => state.user;
export default userSlice.reducer;
