import { CachedLocalidadRepository, FakeDistanceCalculatorService, IDistanceCalculatorService, ILocalidadRepository, InMemoryLocalidadRepository, MatrixAPICalculatorService, WebApiDistanceCalculatorService } from "./repositories";
import { AppConfig, GoogleMatrixMode, WebApiMode, config } from "../config";
import { sampleLocalidadlist } from "./const_data";

let localidadRepository: ILocalidadRepository= new InMemoryLocalidadRepository(sampleLocalidadlist);
let distanceCalculatorService: IDistanceCalculatorService = new FakeDistanceCalculatorService();

let dependencies = { localidadRepository, distanceCalculatorService };

export function UpdateDependencies(newConfig : AppConfig) {

    switch (newConfig.configuration.mode) {
        case "InMemoryMode":
            localidadRepository = new InMemoryLocalidadRepository(sampleLocalidadlist);
            distanceCalculatorService = new FakeDistanceCalculatorService();
            break;
        case "GoogleMatrixMode":
            const googleConfig = newConfig.configuration as GoogleMatrixMode;
            localidadRepository = new InMemoryLocalidadRepository(googleConfig.localidadList);
            distanceCalculatorService = new MatrixAPICalculatorService(googleConfig.apiKey);
            break;
        case "WebApiMode":
            const webApiConfig = newConfig.configuration as WebApiMode;
            localidadRepository = new InMemoryLocalidadRepository(webApiConfig.localidadList);
            distanceCalculatorService = new WebApiDistanceCalculatorService(webApiConfig.distanceCalculatorRoute);
            break;
    }
    dependencies.localidadRepository = localidadRepository;
    dependencies.distanceCalculatorService = distanceCalculatorService;
}
export default dependencies;