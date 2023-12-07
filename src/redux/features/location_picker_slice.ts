import { createSlice, PayloadAction, createAsyncThunk, current } from '@reduxjs/toolkit';
import dependencies from '../../data/dependencies';
import { Distance, GeopointViewModel, LocalidadSelectedViewModel, LocalidadViewModel } from '../../data/models';
import { RootState } from '../store/store';
import { gobernacionLocalidad } from '../../data/const_data';


interface LocationPickerState {
  localidadAutoCompleteList: LocalidadViewModel[];
  selectedLocalidadList: LocalidadSelectedViewModel[];
  startingPoint: LocalidadViewModel | undefined;
  totalDistance: Distance;
  loading: boolean;
  error: string;
}

const initialState: LocationPickerState = {
  localidadAutoCompleteList: [],
  selectedLocalidadList: [],
  totalDistance: { unit: "km", value: 0 },
  startingPoint: gobernacionLocalidad,
  loading: false,
  error: "",
};

export const fetchLocalities = createAsyncThunk<LocalidadViewModel[]>('locationPicker/fetchLocalities', async () => {
  try {
    const response = await dependencies.localidadRepository.getAll();
    return response;
  } catch (error) {
    throw error;
  }
});

export const addLocationToSelectedLocalidad =
  createAsyncThunk<LocalidadSelectedViewModel[], { targetLocalidadId: number }, { state: RootState }>('locationPicker/addLocationToSelectedLocalidad',
    async ({ targetLocalidadId }, thunkAPI) => {
      try {
        let currentState = thunkAPI.getState().locationPicker;
        let targetLocalidad: LocalidadViewModel = await dependencies.localidadRepository.getById(targetLocalidadId);
        let sourceLocalidad: LocalidadViewModel = gobernacionLocalidad;
        //no starting point
        if (!currentState.startingPoint) {
          thunkAPI.dispatch(setStartingPoint(targetLocalidad));
          return currentState.selectedLocalidadList;
        }

        //startingPoint with value but empty selectedList
        if (currentState.selectedLocalidadList.length === 0 && currentState.startingPoint) {
          sourceLocalidad = currentState.startingPoint;
        }

        //we bind the source to the last element of the selectedLocalidadList
        if (currentState.selectedLocalidadList.length > 0) {
          sourceLocalidad = currentState.selectedLocalidadList[currentState.selectedLocalidadList.length - 1].targetLocalidad;
        }

        //validate target is no the last location from selectedItems
        if (sourceLocalidad.id === targetLocalidad.id) {
          throw Error("La localidad de destino no puede tener el mismo valor que la localidad de origen");
        }

        let distance = await dependencies.distanceCalculatorService.getDistance(sourceLocalidad.geoPoint, targetLocalidad.geoPoint);

        let localidadSelected: LocalidadSelectedViewModel = {
          distance: distance,
          sourceLocalidad: sourceLocalidad,
          targetLocalidad: targetLocalidad
        }

        return [...currentState.selectedLocalidadList, localidadSelected];;

      } catch (error) {
        throw error;
      }
    });


const locationPickerListSlice = createSlice({
  name: 'locationPicker',
  initialState,
  reducers:
  {
    setStartingPoint: (state, action: PayloadAction<LocalidadViewModel>) => {
      state.startingPoint = action.payload;
    },
    resetState: (state) => {
      state.selectedLocalidadList = [];
      if(state.localidadAutoCompleteList.length>0){
        state.startingPoint = state.localidadAutoCompleteList[0];
      }else{
        state.startingPoint = gobernacionLocalidad;
      }
      
      state.loading = false;
      state.error = "";
    },
    removeStartingPoint: (state) => {
      if (state.selectedLocalidadList.length == 0) {
        state.startingPoint = undefined;
      }
    },
    removeLastLocalidadSelected: (state) => {
      const newArray = state.selectedLocalidadList.filter((_, index, array) => index < array.length - 1);
      state.selectedLocalidadList = newArray;

      let totalDistance = newArray.reduce((acc, { distance }) => acc + distance.value, 0);
      state.totalDistance = { unit: 'km', value: totalDistance };
    },
    setInitialState: (state, action: PayloadAction<LocalidadSelectedViewModel[]>) => {
      if (action.payload && action.payload.length > 0) {
        state.selectedLocalidadList = action.payload;
        state.startingPoint = action.payload[0].sourceLocalidad;
        let totalDistance = action.payload.reduce((acc, { distance }) => acc + distance.value, 0);
        state.totalDistance = { unit: 'km', value: totalDistance };
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLocalities.pending, (state) => {
      state.loading = true;
    })
      .addCase(fetchLocalities.fulfilled, (state, action) => {
        state.loading = false;
        state.localidadAutoCompleteList = action.payload;
        if (action.payload.length > 0) {
          state.startingPoint = action.payload[0];
        }
      })
      .addCase(fetchLocalities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "something happened";
      });

    builder.addCase(addLocationToSelectedLocalidad.pending, (state) => {
      state.loading = true;
    })
      .addCase(addLocationToSelectedLocalidad.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedLocalidadList = action.payload;
        let totalDistance = action.payload.reduce((acc, { distance }) => acc + distance.value, 0);
        state.totalDistance = { unit: 'km', value: totalDistance };
      })
      .addCase(addLocationToSelectedLocalidad.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "something happened";
      });
  }
});

//export const { increment, decrement } = searchHomeSlice.actions;
//export const { applyFilters } = locationPickerListSlice.actions;
export const { setStartingPoint, resetState, removeLastLocalidadSelected, removeStartingPoint, setInitialState } = locationPickerListSlice.actions;
export default locationPickerListSlice.reducer;
