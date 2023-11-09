
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { LoggerRepository } from "../repositories/logger-repository";
import { LoggerEntity } from "../entities/logger-entity";
import { IlogsFilter } from "types/logger/logger-schema-type";

export interface GetAllLogsUsecase {
  execute: (filter:IlogsFilter) => Promise<Either<ErrorClass, LoggerEntity[]>>;
}

export class GetAllLogs implements GetAllLogsUsecase {
  private readonly loggerRepository: LoggerRepository;
  constructor(loggerRepository: LoggerRepository) {
    this.loggerRepository = loggerRepository; 
  }

  async execute(filter:IlogsFilter): Promise<Either<ErrorClass, LoggerEntity[]>> {
    return await this.loggerRepository.getAllLogs(filter); 
  }
}
