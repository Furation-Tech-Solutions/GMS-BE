import { BookedByNameRepository} from "@domain/booked-by-name/repositories/booked-by-name-repository";
import { Either, Left, Right } from "monet";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { AdminEntity } from "@domain/admin/entities/admin";
import { BookedByNameEntity, BookedByNameModel } from "@domain/booked-by-name/entities/booked-by-name";
import { ServerNameRepository } from "@domain/servers-name/repositories/server-name-repository";
import { ServersNameDataSource } from "../datasources/servers-name-data-source";
import { ServersNameEntity, ServersNameModel } from "@domain/servers-name/entities/servers-name";


export class ServersNameRepositoryImpl implements ServerNameRepository {
    private readonly serverNameDataSource: ServersNameDataSource;
  
    constructor(serverNameDataSource: ServersNameDataSource) {
      this.serverNameDataSource = serverNameDataSource;
    }
    async createServerName(
        serverName: ServersNameModel
      ): Promise<Either<ErrorClass, ServersNameEntity>> {
        try {
          let result = await this.serverNameDataSource.createServerName(serverName);
          return Right<ErrorClass, ServersNameEntity>(result);
        } catch (error) {
          if (error instanceof ApiError && error.status === 409) {
            return Left<ErrorClass, ServersNameEntity>(ApiError.nameExist());
          }
          return Left<ErrorClass, ServersNameEntity>(ApiError.badRequest());
        }
      }
    async getAllServersName(): Promise<Either<ErrorClass, ServersNameEntity[]>> {
        try {
          const response = await this.serverNameDataSource.getAllServersName();
          return Right<ErrorClass, ServersNameEntity[]>(response);
        } catch (error) {
         
          return Left<ErrorClass, ServersNameEntity[]>(ApiError.badRequest());
        }
      }
      async updateServerName(
        id: string,
        data: ServersNameModel
      ): Promise<Either<ErrorClass, ServersNameEntity>> {
        try {
          const response = await this.serverNameDataSource.updateServerName(id, data);
          return Right<ErrorClass, ServersNameEntity>(response);
        } catch (error) {
          return Left<ErrorClass, ServersNameEntity>(ApiError.badRequest());
        }
      }
      async getServerNameById(id: string): Promise<Either<ErrorClass, ServersNameEntity>> {
        try {
          let response = await this.serverNameDataSource.getServerNameById(id);
          return Right<ErrorClass,ServersNameEntity>(response);
        } catch (error) {
          if (error instanceof ApiError && error.status === 404) {
            return Left<ErrorClass, ServersNameEntity>(ApiError.notFound());
          }
          return Left<ErrorClass, ServersNameEntity>(ApiError.badRequest());
        }
      }

      async deleteServerName(id: string): Promise<Either<ErrorClass, void>> {
        try {
          const res = await this.serverNameDataSource.deleteServerName(id);
          return Right<ErrorClass, void>(res);
        } catch (error) {
          return Left<ErrorClass, void>(ApiError.badRequest());
        }
      }
}