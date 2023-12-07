import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import App from './App';
import { Provider, useSelector } from 'react-redux';
import store, { RootState } from './redux/store/store';
import { AppConfig, updateConfig } from './config';
import { apiKey } from './secrets';
import { sampleLocalidadlist } from './data/const_data';
import { LocalidadSelectedViewModel, LocalidadViewModel, RenderComponentProps } from './data/models';
import { setInitialState } from './redux/features/location_picker_slice';

// updateConfig({apiKey: apiKey, localidadList: sampleLocalidadlist});

// const root = ReactDOM.createRoot(
//     document.getElementById('root') as HTMLElement
// );
// root.render(
//     <React.StrictMode>
//         <Provider store={store}>
//             <App />
//         </Provider>

//     </React.StrictMode>
// );
function renderComponent({htmlDocumentElementId, appConfig, initialState}: RenderComponentProps) {

    //updateConfig({apiKey: apikey, localidadList: localidadList,webApiDistanceCalculatorRoute:webApiDistanceCalculatorRoute});
    updateConfig(appConfig);

    if(initialState && initialState.length > 0 ) {
        store.dispatch(setInitialState(initialState));
    }

    const root = ReactDOM.createRoot(
        document.getElementById(htmlDocumentElementId) as HTMLElement
    );
    root.render(
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>
    );
}

function getState () : LocalidadSelectedViewModel[]{
    const { selectedLocalidadList } = store.getState().locationPicker;
    return selectedLocalidadList;
}

export default { 
    render : renderComponent,
    getState : getState
}