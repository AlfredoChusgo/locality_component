import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import dependencies  from '../../data/dependencies';
import { LocalidadSelectedViewModel, LocalidadViewModel } from '../../data/models';


interface LocationPickerState {
  localidadAutoCompleteList: LocalidadViewModel[];
  selectedLocalidadList : LocalidadSelectedViewModel[];
  loading: boolean;
  error: string;
}

const initialState: LocationPickerState = {
  localidadAutoCompleteList: [],
  selectedLocalidadList: [],
  loading: false,
  error: "",
};

export const fetchLocalities = createAsyncThunk<LocalidadViewModel[]>('locationPicker/fetchLocalities', async ()   => {
  try {
    const response = await dependencies.localidadRepository.getAll();
    return response;
  } catch (error) {
    throw error;
  }
});


const locationPickerListSlice = createSlice({
  name: 'locationPicker',
  initialState,
  reducers:
  {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLocalities.pending, (state) => {
      state.loading = true;
    })
      .addCase(fetchLocalities.fulfilled, (state, action) => {
        state.loading = false;
        state.localidadAutoCompleteList = action.payload;
      })
      .addCase(fetchLocalities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "something happened";
      });
  }
});

//export const { increment, decrement } = searchHomeSlice.actions;
//export const { applyFilters } = locationPickerListSlice.actions;
export default locationPickerListSlice.reducer;
