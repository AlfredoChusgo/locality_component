# LocationPicker Component Documentation

## Workflow

### Initial State 

1. if it is a new state , an item will be added by default (gobernacion scz location).
2. Type something and select an item from the dropdown.
3. Show a loading widget while waiting for the API response.
4. Add the selected item to the `selectedLocationList` with the distance from the previous point.

### Select a Locality

1. Type something and select an item from the dropdown.
2. Show a loading widget while waiting for the API response.
3. Add the selected item to the `selectedLocationList` with the distance from the previous point.

### Remove a Locality

1. With `selectedLocationList` containing more than 0 items, select the 'x' icon next to the item.
2. Show a loading widget while waiting for the API response.
3. Remove the item from the `selectedLocationList` with the distance updated.

### Update the inputHidden

Create the component with the ID of the `inputHidden` where it should update its current state.

## Rules

### Select a Locality That Is Already in `selectedLocationList`

- The last item from the `selectedLocationList` should not be selected. Display an error if the same item is selected.

## Examples

```jsx
// Example of using LocationPicker component
<LocationPicker inputHiddenId="myInput" />
