import { CachedLocalidadRepository, FakeDistanceCalculatorService, IDistanceCalculatorService, ILocalidadRepository, InMemoryLocalidadRepository } from "./repositories";

//development config
//let localidadRepository: ILocalidadRepository = new InMemoryLocalidadRepository();
let localidadRepository: ILocalidadRepository = new CachedLocalidadRepository(new InMemoryLocalidadRepository());
let distanceCalculatorService: IDistanceCalculatorService = new FakeDistanceCalculatorService();

export default {localidadRepository,distanceCalculatorService};