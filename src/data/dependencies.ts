import { ILocalidadRepository, InMemoryLocalidadRepository } from "./repositories";


let localidadRepository: ILocalidadRepository = new InMemoryLocalidadRepository();

export default {localidadRepository};