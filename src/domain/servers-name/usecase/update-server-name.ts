import { AdminEntity, AdminModel } from "@domain/admin/entities/admin";
import { AdminRepository } from "@domain/admin/repositories/admin-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
// import { BookedByNameEntity, BookedByNameModel } from "../entities/booked-by-name";
// import { BookedByNameRepository } from "../repositories/booked-by-name-repository";
import { ServersNameEntity, ServersNameModel } from "../entities/servers-name";
import { ServerNameRepository } from "../repositories/server-name-repository";
export interface UpdateServerNameUseCase {
  execute: (
    nameId: string,
    serverNameData: ServersNameModel
  ) => Promise<Either<ErrorClass, ServersNameEntity>>;
}

export class UpdateServerName implements UpdateServerNameUseCase {
  private readonly serverNameRepository: ServerNameRepository;

  constructor(serverNameRepository: ServerNameRepository) {
    this.serverNameRepository = serverNameRepository;
  }

  async execute(
    nameId: string,
    bookedByNameData: ServersNameModel
  ): Promise<Either<ErrorClass, ServersNameEntity>> {
    return await this.serverNameRepository.updateServerName(nameId, bookedByNameData);
  }
}
