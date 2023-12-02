import { sampleLocalidadlist } from "./const_data";
import { Distance, GeopointViewModel, LocalidadViewModel } from "./models";

export interface ILocalidadRepository {
    getAll(): Promise<LocalidadViewModel[]>;

    getById(id: number): Promise<LocalidadViewModel>;
}

export interface IDistanceCalculatorService {
    getDistance(sourceGeopoint: GeopointViewModel, targetGetoPoint: GeopointViewModel): Promise<Distance>;
}


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
export class MatrixAPICalculatorService implements IDistanceCalculatorService {
    
    constructor(private apiKey : string){

    }

    async getDistance(sourceGeopoint: GeopointViewModel, targetGetoPoint: GeopointViewModel): Promise<Distance> {

        try {
        
            // Replace with the desired latitude and longitude coordinates
            const originLat = sourceGeopoint.lat; // New York, NY
            const originLng = sourceGeopoint.long;
            const destinationLat = targetGetoPoint.lat; // Los Angeles, CA
            const destinationLng = targetGetoPoint.long;
        
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${originLat},${originLng}&destinations=${destinationLat},${destinationLng}&key=${this.apiKey}`;
        
            // Make a request to the Distance Matrix API
            const response = await fetch(proxyUrl + apiUrl);
            const data = await response.json();
        
            // Check if the request was successful
            if (data.status === 'OK') {
              // Extract distance and duration from the response
              const distance = data.rows[0].elements[0].distance.text;
              const duration = data.rows[0].elements[0].duration.text;
        
              // Display the results
              console.log(`Distance: ${distance}`);
              console.log(`Duration: ${duration}`);
              
              // Calculate a random value as an example result
              let result = Math.random() * 100 + 1;
              
              return { value: result, unit: "km" };
            } else {
              console.error(`Error: ${data.status}`);
              //return { error: `Error: ${data.status}` };
              throw Error(data.status);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
            throw Error("error");
          }
    }
}


export class InMemoryLocalidadRepository implements ILocalidadRepository {
    private list: LocalidadViewModel[] = [];

    public constructor(localidades :LocalidadViewModel[]) {
        this.list = localidades;        
    }

    async getById(id: number): Promise<LocalidadViewModel> {
        const localidad = this.list.find(item => item.id === id);
        if (localidad) {
            return Promise.resolve(localidad);
        }
        throw new Error(`Localidad con id:${id} no fue encontrada`);
    }


    async getAll(): Promise<LocalidadViewModel[]> {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return this.list;
    }
}