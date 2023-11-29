import React from 'react';
import logo from './logo.svg';
import './App.css';
import LocationPickerComponent from './components/location_picker';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
function App() {
  // return (
  //   <div className="App">
  //     <LocationPickerComponent/>
  //   </div>
  // );
  return (
    <div className="App">
      <Grid container spacing={2}>
            <Grid xs={4}>
            <LocationPickerComponent/>
            </Grid>
        </Grid>
    </div>
  );
}

export default App;
