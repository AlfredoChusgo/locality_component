import { UpdateDependencies } from "./data/dependencies";
import { LocalidadViewModel } from "./data/models";

// config.ts
type Appconfig = {
    apiKey : string;
    localidadList : LocalidadViewModel[];
}
export let config : Appconfig = {
    apiKey: 'default_api_key',
    localidadList: [],
};
// Update the configuration at runtime
export function updateConfig(newConfig: Partial<typeof config>): void {
    config = { ...config, ...newConfig };
    UpdateDependencies();
}