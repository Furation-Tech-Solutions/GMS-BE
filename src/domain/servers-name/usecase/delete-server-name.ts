import { ServersNameRepositoryImpl } from "@data/servers-name/repositories/servers-name-repository-impl";
import { ServerNameRepository } from "../repositories/server-name-repository";
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";


export interface DeleteServerNameUseCase {
    execute: (serverNameId: string) => Promise<Either<ErrorClass, void>>;
  }
  
  export class DeleteServerName implements DeleteServerNameUseCase {
    private readonly serverNameRepository: ServerNameRepository;
  
    constructor(serverNameRepository: ServerNameRepository) {
      this.serverNameRepository = serverNameRepository;
    }
  
    async execute(serverNameId: string): Promise<Either<ErrorClass, void>> {
      return await this.serverNameRepository.deleteServerName(serverNameId);
    }
  }