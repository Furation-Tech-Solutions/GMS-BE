import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { AccessLevelEntity } from "../entities/access-level";
import { AccessLevelRepository } from "../repositories/access-level-repository";

export interface GetAccessLevelByIdUseCase {
  execute: (accessLevelID: string) => Promise<Either<ErrorClass, AccessLevelEntity>>;
}

export class GetAccessLevelById implements GetAccessLevelByIdUseCase {
  private readonly accessLevelRepository: AccessLevelRepository; // Change to ClientRepository

  constructor(accessLevelRepository: AccessLevelRepository) {
    this.accessLevelRepository = accessLevelRepository;
  }

  async execute(accessLevelID: string): Promise<Either<ErrorClass, AccessLevelEntity>> {
    return await this.accessLevelRepository.getAccessLevelById(accessLevelID); // Change to getClientById
  }
}
