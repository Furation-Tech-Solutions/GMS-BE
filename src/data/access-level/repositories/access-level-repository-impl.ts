import { AccessLevelRepository } from "@domain/access-level/repositories/access-level-repository";
import { AccessLevelDataSource } from "../datasources/access-level-data-sources";
import { AccessLevelEntity, AccessLevelModel } from "@domain/access-level/entities/access-level";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { Either, Left, Right } from "monet";

export class AccessLevelRepositoryImpl implements AccessLevelRepository {
    private readonly accesseLevelDataSource: AccessLevelDataSource;
  
    constructor(accesseLevelDataSource: AccessLevelDataSource) {
      this.accesseLevelDataSource = accesseLevelDataSource;
    }
  
    async createAccessLevel(
      accessLevel: AccessLevelModel
    ): Promise<Either<ErrorClass, AccessLevelEntity>> {
      try {
        let i = await this.accesseLevelDataSource.create(accessLevel);
        return Right<ErrorClass, AccessLevelEntity>(i);
      } catch (e) {
        if (typeof ApiError.roleExist) {
          return Left<ErrorClass,AccessLevelEntity >(ApiError.roleExist());
        }
        return Left<ErrorClass, AccessLevelEntity>(ApiError.badRequest());
      }
    }
}