import { combineReducers } from '@reduxjs/toolkit';
import userSlice from '../slices/userSlice';

export const rootReducer = combineReducers({
  user: userSlice,
});
