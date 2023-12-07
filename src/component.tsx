import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import { updateConfig } from './config';
import { apiKey } from './secrets';
import { sampleLocalidadlist } from './data/const_data';
import { LocalidadViewModel, RenderComponentProps } from './data/models';

updateConfig({apiKey: apiKey, localidadList: sampleLocalidadlist});

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>

    </React.StrictMode>
);
function renderComponent({htmlDocumentElementId, apikey,localidadList, webApiDistanceCalculatorRoute}:RenderComponentProps){

    updateConfig({apiKey: apikey, localidadList: localidadList,webApiDistanceCalculatorRoute:webApiDistanceCalculatorRoute});
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

export default { 
    renderComponent : renderComponent
}