import { AdminEntity } from "@domain/admin/entities/admin";
import { AdminRepository } from "@domain/admin/repositories/admin-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { ServersNameEntity } from "../entities/servers-name";
import { ServerNameRepository } from "../repositories/server-name-repository";
export interface GetServerNameByIdUsecase {
  execute: (nameId: string) => Promise<Either<ErrorClass, ServersNameEntity>>;
}

export class GetServerNameById implements GetServerNameByIdUsecase {
  private readonly serverNameRepository: ServerNameRepository;

  constructor(serverNameRepository: ServerNameRepository) {
    this.serverNameRepository = serverNameRepository;
  }

  async execute(nameId: string): Promise<Either<ErrorClass, ServersNameEntity>> {
    return await this.serverNameRepository.getServerNameById(nameId);
  }
}
