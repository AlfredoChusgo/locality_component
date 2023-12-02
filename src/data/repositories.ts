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
                {
                  id: 2,
                  displayName: 'Montero',
                  geoPoint: { lat: -17.3399, long: -63.2548 },
                },
                {
                  id: 3,
                  displayName: 'Warnes',
                  geoPoint: { lat: -17.4921, long: -63.1528 },
                },
                {
                  id: 4,
                  displayName: 'Cotoca',
                  geoPoint: { lat: -17.7682, long: -63.1843 },
                },
                {
                  id: 5,
                  displayName: 'Portachuelo',
                  geoPoint: { lat: -17.3543, long: -63.4057 },
                },
                {
                  id: 6,
                  displayName: 'San Ignacio de Velasco',
                  geoPoint: { lat: -16.3708, long: -60.9605 },
                },
                {
                  id: 7,
                  displayName: 'Samaipata',
                  geoPoint: { lat: -18.1800, long: -63.8663 },
                },
                {
                  id: 8,
                  displayName: 'Colpa Bélgica',
                  geoPoint: { lat: -16.4704, long: -62.0509 },
                },
                {
                  id: 9,
                  displayName: 'Buena Vista',
                  geoPoint: { lat: -17.4528, long: -63.6424 },
                },
                {
                  id: 10,
                  displayName: 'San José de Chiquitos',
                  geoPoint: { lat: -17.7765, long: -60.7566 },
                },
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