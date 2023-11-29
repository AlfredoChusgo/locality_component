import { FakeDistanceCalculatorService, IDistanceCalculatorService, ILocalidadRepository, InMemoryLocalidadRepository } from "./repositories";


let localidadRepository: ILocalidadRepository = new InMemoryLocalidadRepository();
let distanceCalculatorService: IDistanceCalculatorService = new FakeDistanceCalculatorService();

export default {localidadRepository,distanceCalculatorService};