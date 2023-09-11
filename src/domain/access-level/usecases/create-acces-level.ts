import { OutletModel, OutletEntity } from "@domain/outlet/entities/outlet";
import { OutletRepository } from "@domain/outlet/repositories/outlet-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { AccessLevelEntity, AccessLevelModel } from "../entities/access-level";
import { AccessLevelRepositoryImpl } from "@data/access-level/repositories/access-level-repository-impl";
import { AccessLevelRepository } from "../repositories/access-level-repository";


export interface CreateAccessLevelUsecase {
  execute: (
    accessLevelData: AccessLevelModel ) => Promise<Either<ErrorClass, AccessLevelEntity>>;
}

export class CreateAccessLevel implements CreateAccessLevelUsecase {
  private readonly accessLevelRepository: AccessLevelRepository;

  constructor(accessLevelRepository: AccessLevelRepository) {
    this.accessLevelRepository = accessLevelRepository;
  }

  async execute(accessLevelData: AccessLevelModel): Promise<Either<ErrorClass, AccessLevelEntity>> {

    return await this.accessLevelRepository.createAccessLevel(accessLevelData);

  }
}

