export interface LocalidadViewModel{
    id: number;
    displayName : string;
    long : string;
    lat : string;
}

export interface LocalidadSelectedViewModel{
    sourceLocalidad: LocalidadViewModel;
    targetLocalidad : LocalidadViewModel;
    distance:number;
}
