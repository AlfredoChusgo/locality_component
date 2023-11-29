// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import locationPickerReducer from '../features/location_picker_slice';
import { useDispatch } from 'react-redux'
const store = configureStore({
  reducer: {
    locationPicker: locationPickerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch

export default store;
