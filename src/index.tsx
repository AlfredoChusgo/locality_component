import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import { updateConfig } from './config';
import { apiKey } from './secrets';
import { sampleLocalidadlist } from './data/const_data';

updateConfig({apiKey: apiKey, localidadList: sampleLocalidadlist});


const app = App();