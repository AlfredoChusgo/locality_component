import { Distance, GeopointViewModel, LocalidadViewModel } from "./models";

export interface ILocalidadRepository{
    getAll(): Promise<LocalidadViewModel[]>;
}

export interface IDistanceCalculatorService{
    getDistance( sourceGeopoint: GeopointViewModel, targetGetoPoint: GeopointViewModel): Promise<Distance>;
}


export class InMemoryLocalidadRepository implements ILocalidadRepository {
    private list: LocalidadViewModel[] = [];
    private isLoaded: boolean = false;

    public constructor() {
        // private constructor to prevent constructing new instances of the Singleton outside the class
    }


    private async loadList(): Promise<void> {

        try {

            this.list = [
                {id:1,displayName:"localidad 1",lat:"45.5456",long:"46.5454"},
                {id:2,displayName:"localidad 2",lat:"46.5456",long:"47.5454"},
                {id:3,displayName:"localidad 3",lat:"47.5456",long:"48.5454"},
            ];
            this.isLoaded = true;
        } catch (error) {
            throw error;
        }
    }

    private async load(): Promise<void> {
        if (!this.isLoaded) {
            await this.loadList();
        }
    }

    async getAll(): Promise<LocalidadViewModel[]> {
        await this.load();
        return this.list;
    }
}

export class FakeDistanceCalculatorService implements IDistanceCalculatorService {
    getDistance(sourceGeopoint: GeopointViewModel, targetGetoPoint: GeopointViewModel): Promise<Distance> {
        return new Promise((resolve,reject)=>{
            let result = Math.random() * 100 + 1;
            return resolve(new Distance(result,"km"));
        });        
    }
}