import { AppConfig } from "../config";

export interface LocalidadViewModel {
    id: number;
    displayName: string;
    geoPoint: GeopointViewModel;
}

export interface LocalidadSelectedViewModel {
    sourceLocalidad: LocalidadViewModel;
    targetLocalidad: LocalidadViewModel;
    distance: Distance;
}

export interface GeopointViewModel {
    lat: number;
    long: number;
}

// Define a type for the unit
export type DistanceUnit = 'mt' | 'km' | 'mi';

// Define an interface for the Distance
export interface Distance {
  value: number;
  unit: DistanceUnit;
}

export interface RenderComponentProps {
    htmlDocumentElementId:string;
    appConfig:AppConfig;
    initialState : LocalidadSelectedViewModel[];
}
  



