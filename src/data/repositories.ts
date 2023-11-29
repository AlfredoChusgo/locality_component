import { Distance, GeopointViewModel, LocalidadViewModel } from "./models";

export interface ILocalidadRepository {
    getAll(): Promise<LocalidadViewModel[]>;

    getById(id: number): Promise<LocalidadViewModel>;
}

// export interface IAddLocalidadOperation{
//     addRangue(localidades:LocalidadViewModel[]): Promise<void>;
// }

export interface IDistanceCalculatorService {
    getDistance(sourceGeopoint: GeopointViewModel, targetGetoPoint: GeopointViewModel): Promise<Distance>;
}


// export class InMemoryLocalidadRepository implements ILocalidadRepository, IAddLocalidadOperation {
//     private list: LocalidadViewModel[] = [];

//     public constructor() {
//         // private constructor to prevent constructing new instances of the Singleton outside the class
//     }
//     async addRangue(localidades: LocalidadViewModel[]): Promise<void> {
//         this.list = localidades;
//     }

//     async getAll(): Promise<LocalidadViewModel[]> {
//         return this.list;
//     }

//     async getById(id: string): Promise<LocalidadViewModel> {
//         const localidad = this.list.find(item => item.id.toString() === id);

//         if (localidad) {
//             return Promise.resolve(localidad);
//         }
//         throw new Error(`Localidad con id:${id} no fue encontrada`);
//     }
// }

export class CachedLocalidadRepository implements ILocalidadRepository {
    private list: LocalidadViewModel[] = [];

    public constructor(private remoteRepository: ILocalidadRepository) {

    }

    async getById(id: number): Promise<LocalidadViewModel> {
        if (this.list.length == 0) {
            this.list = await this.remoteRepository.getAll();
        }

        const localidad = this.list.find(item => item.id === id);

        if (localidad) {
            return Promise.resolve(localidad);
        }
        throw new Error(`Localidad con id:${id} no fue encontrada`);

    }
    async getAll(): Promise<LocalidadViewModel[]> {
        if (this.list.length == 0) {
            this.list = await this.remoteRepository.getAll();
        }
        return this.list;
    }

}

export class FakeDistanceCalculatorService implements IDistanceCalculatorService {
    async getDistance(sourceGeopoint: GeopointViewModel, targetGetoPoint: GeopointViewModel): Promise<Distance> {
        await new Promise((resolve) => setTimeout(resolve, 500));
        let result = Math.random() * 100 + 1;
        return {value:result,unit: "km"};        
    }
}


export class InMemoryLocalidadRepository implements ILocalidadRepository {
    private list: LocalidadViewModel[] = [];
    private isLoaded: boolean = false;

    public constructor() {
        // private constructor to prevent constructing new instances of the Singleton outside the class
    }

    async getById(id: number): Promise<LocalidadViewModel> {
        await this.load();
        const localidad = this.list.find(item => item.id === id);

        if (localidad) {
            return Promise.resolve(localidad);
        }
        throw new Error(`Localidad con id:${id} no fue encontrada`);
    }

    private async loadList(): Promise<void> {

        try {
            this.list = [
                {id:11,displayName:"localidad 1",geoPoint:{lat:45.5456,long:46.5454}},
                {id:22,displayName:"localidad 2",geoPoint:{lat:46.5456,long:47.5454}},
                {id:33,displayName:"localidad 3",geoPoint:{lat:47.5456,long:48.5454}},
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
        await new Promise((resolve) => setTimeout(resolve, 500));
        return this.list;
    }
}