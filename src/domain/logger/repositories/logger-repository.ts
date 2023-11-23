
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { LoggerEntity, LoggerModel } from "../entities/logger-entity";
import { IlogsFilter } from "types/logger/logger-schema-type";

export interface LoggerRepository {
    createLogger(loggerData: LoggerModel): Promise<Either<ErrorClass, LoggerEntity>>;
    getAllLogs(filter: IlogsFilter): Promise<Either<ErrorClass, LoggerEntity[]>>;
    // getNameById(id: string):Promise<Either<ErrorClass, BookedByNameEntity>>;
    // updateName(id: string, data: BookedByNameModel ): Promise<Either<ErrorClass, BookedByNameEntity>> 
    // deleteBookedByName(id: string): Promise<Either<ErrorClass, void>>;
}
 