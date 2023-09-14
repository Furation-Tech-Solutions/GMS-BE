import { AdminEntity, AdminModel } from "@domain/admin/entities/admin";
import { AdminRepository } from "@domain/admin/repositories/admin-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { ServersNameEntity, ServersNameModel } from "../entities/servers-name";
import { ServerNameRepository } from "../repositories/server-name-repository";

export interface CreateServerNameUseCase {
  execute: (serverNameData: ServersNameModel) => Promise<Either<ErrorClass,ServersNameEntity>>;
}

export class CreateServerName implements CreateServerNameUseCase {
  private readonly serverNameRepository: ServerNameRepository;

  constructor(serverNameRepository: ServerNameRepository) {
    this.serverNameRepository = serverNameRepository;
  }

  async execute(serverNameData: ServersNameModel): Promise<Either<ErrorClass,ServersNameEntity>> {
    return await this.serverNameRepository.createServerName(serverNameData);
  }
  
}
