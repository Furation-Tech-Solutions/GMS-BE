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
    async getAccessLevel():Promise<Either<ErrorClass,AccessLevelEntity[]>>{
      try{
        const response = await this.accesseLevelDataSource.getAll();
        return Right<ErrorClass, AccessLevelEntity[]>(response);
      }
      catch(error){
        return Left<ErrorClass, AccessLevelEntity[]>(ApiError.badRequest());
      
      }
    }
    async deleteAccessLevel(id: string): Promise<Either<ErrorClass, void>> {
      // await this.dataSource.delete(id);
      try {
        const i = await this.accesseLevelDataSource.delete(id);
        return Right<ErrorClass, void>(i);
      } catch (e) {
        return Left<ErrorClass, void>(ApiError.badRequest());
      }
    }
    async getAccessLevelById(id: string): Promise<Either<ErrorClass, AccessLevelEntity>> {
      try {
          const accessLevel = await this.accesseLevelDataSource.read(id); // Use the client data source
          return accessLevel
              ? Right<ErrorClass, AccessLevelEntity>(accessLevel)
              : Left<ErrorClass, AccessLevelEntity>(ApiError.notFound());
      } catch (e) {
          if (e instanceof ApiError && e.name === "notfound") {
              return Left<ErrorClass, AccessLevelEntity>(ApiError.notFound());
          }
          return Left<ErrorClass, AccessLevelEntity>(ApiError.badRequest());
      }
  }
}