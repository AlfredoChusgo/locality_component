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

export interface GeopointViewModel{
    lat:string;
    long:string;
}

export class Distance {
    private _value: number;
    private _unit: 'mt' | 'km' | 'mi';

    constructor(value: number, unit: 'mt' | 'km' | 'mi') {
        this._value = value;
        this._unit = unit;
    }

    get value(): number {
        return this._value;
    }

    get unit(): 'mt' | 'km' | 'mi' {
        return this._unit;
    }

    toString(): string {
        return `${this._value} ${this._unit}`;
    }
}


