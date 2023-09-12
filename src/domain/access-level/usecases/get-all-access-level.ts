import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { AccessLevelEntity } from "../entities/access-level";
import { AccessLevelRepository } from "../repositories/access-level-repository";


export interface GetAllAccessLevelUseCase {
  execute: () => Promise<Either<ErrorClass, AccessLevelEntity[]>>;
}

export class GetAllAccessLevel implements GetAllAccessLevelUseCase {
  private readonly accessLevelRepository: AccessLevelRepository;

  constructor(accessLevelRepository: AccessLevelRepository) {
    this.accessLevelRepository = accessLevelRepository;
  }

  async execute(): Promise<Either<ErrorClass, AccessLevelEntity[]>> {
    return await this.accessLevelRepository.getAccessLevel();
  }
}
