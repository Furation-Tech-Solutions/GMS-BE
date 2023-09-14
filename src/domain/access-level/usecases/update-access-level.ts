import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { AccessLevelEntity, AccessLevelModel } from "../entities/access-level";
import { AccessLevelRepository } from "../repositories/access-level-repository";

export interface UpdateAccessLevelUseCase {
  execute: (
    accessLevelId: string,
    accessLevelData: AccessLevelModel
  ) => Promise<Either<ErrorClass, AccessLevelEntity>>;
}

export class UpdateAccessLevel implements UpdateAccessLevelUseCase {
  private readonly accessLevelRepository: AccessLevelRepository;

  constructor(accessLevelRepository: AccessLevelRepository) {
    this.accessLevelRepository = accessLevelRepository;
  }

  async execute(
    accessLevelId: string,
    accessLevelData: AccessLevelModel
  ): Promise<Either<ErrorClass, AccessLevelEntity>> {
    return await this.accessLevelRepository.updateAccessLevel(accessLevelId, accessLevelData);
  }
}

