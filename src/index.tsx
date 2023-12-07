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
  appConfig: appMemoryConfig,
  initialState : [
    {sourceLocalidad:sampleLocalidadlist[0],targetLocalidad:sampleLocalidadlist[1],distance:{value:45,unit:"km"}},
    {sourceLocalidad:sampleLocalidadlist[4],targetLocalidad:sampleLocalidadlist[1],distance:{value:75,unit:"km"}},
    {sourceLocalidad:sampleLocalidadlist[3],targetLocalidad:sampleLocalidadlist[5],distance:{value:95,unit:"km"}},
]
}
localidadComponent.render(renderComponentProps);

