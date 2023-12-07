import { UpdateDependencies } from "./data/dependencies";
import { LocalidadViewModel } from "./data/models";

// config.ts
// type Appconfig = {
//     apiKey : string;
//     webApiDistanceCalculatorRoute : string;
//     localidadList : LocalidadViewModel[];
// }


export type InMemoryMode = {
    mode:"InMemoryMode";
}

export type GoogleMatrixMode = {
    mode:"GoogleMatrixMode";
    apiKey: string;
    localidadList: LocalidadViewModel[];
}

export type WebApiMode = {
    mode:"WebApiMode";
    distanceCalculatorRoute: string;
    localidadList: LocalidadViewModel[];
}

export type AppConfig = {
    configuration : InMemoryMode | GoogleMatrixMode | WebApiMode
}

export let config : AppConfig = {
    // apiKey: 'default_api_key',
    // webApiDistanceCalculatorRoute:"",
    // localidadList: [],
    configuration : {mode:"InMemoryMode"}
};
// Update the configuration at runtime
export function updateConfig(newConfig: Partial<typeof config>): void {
    config = { ...config, ...newConfig };
    UpdateDependencies(config);
}