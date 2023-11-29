//import Autocomplete from '@mui/material/Autocomplete';

import { Autocomplete, Avatar, CircularProgress, IconButton, List, ListItem, ListItemAvatar, ListItemText, Skeleton, Stack, TextField } from "@mui/material";
import store, { RootState, useAppDispatch } from "../redux/store/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { addLocationToSelectedLocalidad, fetchLocalities } from "../redux/features/location_picker_slice";
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";
import { LocalidadViewModel } from "../data/models";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

export default function LocationPickerComponent() {
    const dispatch = useAppDispatch;

    const { localidadAutoCompleteList: localidadList, loading, error, selectedLocalidadList, startingPoint } = useSelector((state: RootState) => state.locationPicker);
    useEffect(() => {
        store.dispatch(fetchLocalities());
    }, [dispatch]);

    const selectedLocalidadComponent = selectedLocalidadList.map(e => {
        const primaryText = `${e.sourceLocalidad.displayName} - ${e.targetLocalidad.displayName}`;
        const secondaryText = `${e.distance.value} ${e.distance.unit}`;
        const key = `${e.sourceLocalidad.id}-${e.targetLocalidad.id}`;
        return <ListItem
            key={key}
            secondaryAction={
                <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            }
        >
            <ListItemText
                primary={primaryText}
                secondary={secondaryText}
            />
        </ListItem>;
    });

    const startingPointComponent = (<ListItem
        key={startingPoint?.id}
        secondaryAction={
            <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
            </IconButton>
        }
        style={{ backgroundColor: '#40F99B' }}
    >
        <ListItemText
            primary={startingPoint?.displayName}
            secondary="Punto de partida"
        />
    </ListItem>);

    const handleOnChange = (
        event: React.ChangeEvent<{}>,
        newValue: LocalidadViewModel | null,
    ) => {
        if (!newValue) {
            return;
        }

        store.dispatch(addLocationToSelectedLocalidad({ targetLocalidadId: newValue.id }));
    };
    let selectedLocalidadLoading = (
        <Stack spacing={1}>

            <Skeleton variant="rounded" width={210} height={60} />
            <Skeleton variant="rounded" width={210} height={60} />
            <Skeleton variant="rounded" width={210} height={60} />
        </Stack>);
    // let component = (
    //     <div>
    //         <h1>LocationComponent</h1>
    //         <Autocomplete
    //             disablePortal
    //             id="localidad-combo"
    //             options={localidadList}
    //             loading={loading}
    //             getOptionLabel={(option) => option.displayName}
    //             sx={{ width: 300 }}
    //             renderInput={(params) => <TextField {...params} label="Localidades" />}
    //             onChange={handleOnChange}
    //         />

    //         <List >
    //             {startingPointComponent != undefined && startingPointComponent}
    //             {!loading && selectedLocalidadComponent}
    //             {loading && selectedLocalidadLoading}
    //         </List>
    //     </div>
    // );
    let component = (
        <div>
        <Grid container spacing={2}>
            <Grid xs={12}>
                <h1>LocationComponent</h1>
            </Grid>
            <Grid xs={12}>
            <Autocomplete
                disablePortal
                id="localidad-combo"
                options={localidadList}
                loading={loading}
                getOptionLabel={(option) => option.displayName}
                
                // renderInput={(params) => <TextField {...params} label="Localidades" />}
                renderInput={(params) => <TextField {...params} label="Localidades" />}
                onChange={handleOnChange}
            />
            </Grid>
            <Grid xs={12}>
                
            <List >
                {startingPointComponent != undefined && startingPointComponent}
                {!loading && selectedLocalidadComponent}
                {loading && selectedLocalidadLoading}
            </List>
            </Grid>
            <Grid xs={8}>
                {/* <Item>xs=8</Item> */}
            </Grid>
        </Grid>
            
        </div>
    );

    //todo create error;
    return (
        <div>
            {component}
        </div>
    );

}
