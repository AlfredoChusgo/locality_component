import { UpdateDependencies } from "./data/dependencies";
import { LocalidadViewModel } from "./data/models";

// config.ts
type Appconfig = {
    apiKey : string;
    webApiDistanceCalculatorRoute : string;
    localidadList : LocalidadViewModel[];
}

type ApplicationMOde = ""
export let config : Appconfig = {
    apiKey: 'default_api_key',
    webApiDistanceCalculatorRoute:"",
    localidadList: [],
};
type InMemoryMode = {
}

type GoogleMatrixMode = {
    apiKey: 'default_api_key',
    localidadList: [],
}

type WebApiMode = {
    distanceCalculatorRoute: '/Distance/CalculateDistance',
    localidadList: [],
}

type Appconfig2 = {
    configuration : InMemoryMode | GoogleMatrixMode | WebApiMode
}
// Update the configuration at runtime
export function updateConfig(newConfig: Partial<typeof config>): void {
    config = { ...config, ...newConfig };
    UpdateDependencies();
}