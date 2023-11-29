//import Autocomplete from '@mui/material/Autocomplete';

import { Autocomplete, Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField } from "@mui/material";
import store, { RootState, useAppDispatch } from "../redux/store/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { addLocationToSelectedLocalidad, fetchLocalities } from "../redux/features/location_picker_slice";
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";
import { LocalidadViewModel } from "../data/models";


export default function LocationPickerComponent() {
    const dispatch = useAppDispatch;

    const { localidadAutoCompleteList: localidadList, loading, error, selectedLocalidadList } = useSelector((state: RootState) => state.locationPicker);
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

    const handleOnChange = (
        event: React.ChangeEvent<{}>,
        newValue: LocalidadViewModel | null,
      ) => {
        //setSelectedOption(newValue);
        if(!newValue){
            return;
        }

        store.dispatch(addLocationToSelectedLocalidad({targetLocalidadId:newValue.id}));
      };
    //todo create error;
    return (
        <div>
            <h1>LocationComponent</h1>
            <Autocomplete
                disablePortal
                id="localidad-combo"
                options={localidadList}
                getOptionLabel={(option) => option.displayName}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Movie" />}
                onChange={handleOnChange}
            />

            <List >
                {/* {generate(
                    <ListItem
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        }
                    >
                        <ListItemText
                            primary="Single-line item"
                            secondary={'Secondary text'}
                        />
                    </ListItem>,
                )} */}
                {selectedLocalidadComponent}
            </List>
        </div>
    );
}

function generate(element: React.ReactElement) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}