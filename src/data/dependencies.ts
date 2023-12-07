import { CachedLocalidadRepository, FakeDistanceCalculatorService, IDistanceCalculatorService, ILocalidadRepository, InMemoryLocalidadRepository, MatrixAPICalculatorService, WebApiDistanceCalculatorService } from "./repositories";
import { config } from "../config";

let localidadRepository: ILocalidadRepository = new InMemoryLocalidadRepository(config.localidadList);
let distanceCalculatorService: IDistanceCalculatorService = new MatrixAPICalculatorService(config.apiKey);

let dependencies = {localidadRepository,distanceCalculatorService};
export function UpdateDependencies(){
    dependencies.localidadRepository= new InMemoryLocalidadRepository(config.localidadList);
    //dependencies.distanceCalculatorService = new MatrixAPICalculatorService(config.apiKey);
    dependencies.distanceCalculatorService = new WebApiDistanceCalculatorService(config.webApiDistanceCalculatorRoute);
}
export default dependencies;