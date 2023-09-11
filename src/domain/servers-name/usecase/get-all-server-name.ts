import { AdminEntity } from "@domain/admin/entities/admin";
// import { AdminRepository } from "@domain/admin/repositories/admin-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { BookedByNameRepository} from "@domain/booked-by-name/repositories/booked-by-name-repository";
import { ServersNameRepositoryImpl } from "@data/servers-name/repositories/servers-name-repository-impl";
import { ServerNameRepository } from "../repositories/server-name-repository";
import { ServersNameEntity } from "../entities/servers-name";

export interface GetAllServersNameUseCase {
  execute: () => Promise<Either<ErrorClass,ServersNameEntity[]>>;
}

export class GetAllServersName implements GetAllServersNameUseCase {
  private readonly serverNameRepository: ServerNameRepository;

  constructor(serverNameRepository: ServerNameRepository) {
    this.serverNameRepository = serverNameRepository;
  }

  async execute(): Promise<Either<ErrorClass, ServersNameEntity[]>> {
    return await this.serverNameRepository.getAllServersName();
  }
}