import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import { AppConfig, updateConfig } from './config';
import { apiKey } from './secrets';
import { sampleLocalidadlist } from './data/const_data';
import localidadComponent from './component';
import { RenderComponentProps } from './data/models';
//updateConfig({apiKey: apiKey, localidadList: sampleLocalidadlist});
// updateConfig({configuration:{mode:"InMemoryMode"}});


// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>

//   </React.StrictMode>
// );
const appMemoryConfig : AppConfig = { 
  configuration : {
    mode : "InMemoryMode"
  }
};

const appGoogleConfig : AppConfig = { 
  configuration : {
    mode : "GoogleMatrixMode",
    apiKey: apiKey,
    localidadList: sampleLocalidadlist
  }
}

const appWebApiConfig : AppConfig = { 
  configuration : {
    mode : "WebApiMode",
    //distanceCalculatorRoute : "https://localhost:7233/Distance/CalculateDistance",
    distanceCalculatorRoute : "http://localhost:5233/Distance/CalculateDistance",
    localidadList: sampleLocalidadlist
  }
}
const renderComponentProps : RenderComponentProps = {
  htmlDocumentElementId : "root",
  appConfig: appWebApiConfig
}
localidadComponent.render(renderComponentProps);

