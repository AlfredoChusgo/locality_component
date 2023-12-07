import { Autocomplete, Avatar, CircularProgress, IconButton, List, ListItem, ListItemAvatar, ListItemText, Skeleton, Stack, TextField, Tooltip, Typography } from "@mui/material";
import store, { RootState, useAppDispatch } from "../redux/store/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { addLocationToSelectedLocalidad, fetchLocalities, removeLastLocalidadSelected, removeStartingPoint, resetState } from "../redux/features/location_picker_slice";
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";
import { LocalidadViewModel } from "../data/models";
import Grid from '@mui/material/Unstable_Grid2';
import RestoreIcon from '@mui/icons-material/Restore';
export default function LocationPickerComponent() {
    const dispatch = useAppDispatch;

    const { localidadAutoCompleteList: localidadList, loading, error, selectedLocalidadList, startingPoint, totalDistance } = useSelector((state: RootState) => state.locationPicker);
    useEffect(() => {
        store.dispatch(fetchLocalities());
    }, [dispatch]);

    const selectedLocalidadComponent = selectedLocalidadList.map((e, index) => {
        const primaryText = `${e.sourceLocalidad.displayName} - ${e.targetLocalidad.displayName}`;
        const secondaryText = `${Number(e.distance.value.toFixed(2))} ${e.distance.unit}`;
        const key = `${e.sourceLocalidad.id}-${e.targetLocalidad.id}`;

        const deleteAction = (index == selectedLocalidadList.length - 1) ? (
            <IconButton edge="end" aria-label="delete" onClick={() => {
                store.dispatch(removeLastLocalidadSelected());
            }}>
                <DeleteIcon />
            </IconButton>
        ) : null;

        return <ListItem
            key={key}
            secondaryAction={deleteAction}
        >
            <ListItemText
                primary={primaryText}
                secondary={secondaryText}
            />
        </ListItem>;
    });


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

            <Skeleton variant="rounded" height={60} />
            <Skeleton variant="rounded" height={60} />
            <Skeleton variant="rounded" height={60} />
            <Skeleton variant="rounded" height={30} />
        </Stack>);

    let component = (
        <div>
            <Grid container spacing={2}>
                {/* <Grid xs={12}>
                    <h1>LocationComponent</h1>
                </Grid> */}
                <Grid xs={11}>
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
                <Grid xs={1}>
                    <Tooltip title="Reiniciar">
                        <IconButton edge="end" aria-label="Reiniciar" onClick={() => {
                            store.dispatch(resetState());
                        }}>
                            <RestoreIcon />
                        </IconButton>
                    </Tooltip>

                </Grid>
                <Grid xs={12} spacing={1}>

                    <List >
                        {!loading && getStartingPointComponent() != undefined && getStartingPointComponent()}
                        {!loading && selectedLocalidadComponent}
                        {loading && selectedLocalidadLoading}
                    </List>
                </Grid>
                <Grid xs={8}>
                    {/* <Item>xs=8</Item> */}
                    <Typography variant="subtitle1" component="span">
                        {`Distancia total : ${Math.round(totalDistance.value * 100) / 100} ${totalDistance.unit} `}

                    </Typography>
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


    function getStartingPointComponent() {
        const startingPointActionButton = selectedLocalidadList.length == 0  ? (
        <IconButton edge="end" aria-label="delete" onClick={()=>{
            store.dispatch(removeStartingPoint());
        }}>
            <DeleteIcon />
        </IconButton>) : null;
        const startingPointComponent = (<ListItem
            key={startingPoint?.id}
            secondaryAction={startingPointActionButton}
            style={{ backgroundColor: '#40F99B' }}
        >
            <ListItemText
                primary={startingPoint?.displayName}
                secondary="Punto de partida" />
        </ListItem>);
        return startingPoint ? startingPointComponent : null;
    }
}

