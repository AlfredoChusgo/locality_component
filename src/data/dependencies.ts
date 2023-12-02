import { apiKey } from "../secrets";
import { CachedLocalidadRepository, FakeDistanceCalculatorService, IDistanceCalculatorService, ILocalidadRepository, InMemoryLocalidadRepository, MatrixAPICalculatorService } from "./repositories";

//development config
//let localidadRepository: ILocalidadRepository = new InMemoryLocalidadRepository();
let localidadRepository: ILocalidadRepository = new CachedLocalidadRepository(new InMemoryLocalidadRepository());
//let distanceCalculatorService: IDistanceCalculatorService = new FakeDistanceCalculatorService();
let distanceCalculatorService: IDistanceCalculatorService = new MatrixAPICalculatorService(apiKey);

export default {localidadRepository,distanceCalculatorService};