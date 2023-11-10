
import { Either, Left, Right } from "monet";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { LoggerRepository } from "@domain/logger/repositories/logger-repository";
import { LoggerDataSource } from "../datasource/logger-datasource";
import { LoggerEntity, LoggerModel } from "@domain/logger/entities/logger-entity";
import { IlogsFilter } from "types/logger/logger-schema-type";


export class LoggerRepositoryImpl implements LoggerRepository {
    private readonly loggerDataSource: LoggerDataSource;
  
    constructor(bookedByNameDataSource: LoggerDataSource) {
      this.loggerDataSource = bookedByNameDataSource;
    }
    async createLogger(
        loggerData: LoggerModel
      ): Promise<Either<ErrorClass, LoggerEntity>> {
        try {
          let result = await this.loggerDataSource.create(loggerData);

          return Right<ErrorClass, LoggerEntity>(result);

        } catch (error) {
          if (error instanceof ApiError && error.status === 409) {
            return Left<ErrorClass, LoggerEntity>(ApiError.nameExist());
          }
          return Left<ErrorClass, LoggerEntity>(ApiError.badRequest());
        }
      }


    async getAllLogs(filter: IlogsFilter): Promise<Either<ErrorClass, LoggerEntity[]>> {
        try {

          const response = await this.loggerDataSource.getAll(filter);

          return Right<ErrorClass, LoggerEntity[]>(response);
        } catch (error) {
         
          return Left<ErrorClass, LoggerEntity[]>(ApiError.badRequest());
        }
      }


    //   async updateName(
    //     id: string,
    //     data: BookedByNameModel
    //   ): Promise<Either<ErrorClass, BookedByNameEntity>> {
    //     try {
    //       const response = await this.bookedByNameDataSource.updateName(id, data);
    //       return Right<ErrorClass, BookedByNameEntity>(response);
    //     } catch (error) {
    //       return Left<ErrorClass, BookedByNameEntity>(ApiError.badRequest());
    //     }
    //   }

    //   async getNameById(id: string): Promise<Either<ErrorClass, BookedByNameEntity>> {
    //     try {
    //       let response = await this.bookedByNameDataSource.read(id);
    //       return Right<ErrorClass,BookedByNameEntity>(response);
    //     } catch (error) {
    //       if (error instanceof ApiError && error.status === 404) {
    //         return Left<ErrorClass, BookedByNameEntity>(ApiError.notFound());
    //       }
    //       return Left<ErrorClass, BookedByNameEntity>(ApiError.badRequest());
    //     }
    //   }

    //   async deleteBookedByName(id: string): Promise<Either<ErrorClass, void>> {
    //     try {
    //       const res = await this.bookedByNameDataSource.delete(id);
    //       return Right<ErrorClass, void>(res);
    //     } catch (error) {
    //       return Left<ErrorClass, void>(ApiError.badRequest());
    //     }
    //   }
}