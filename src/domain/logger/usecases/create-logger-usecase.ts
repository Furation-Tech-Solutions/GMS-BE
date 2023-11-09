import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either, Right, Left } from "monet";
import { LoggerEntity, LoggerModel } from "../entities/logger-entity";
import { LoggerRepository } from "../repositories/logger-repository";

export interface CreateLoggerUsecase {
    execute: (loggerData: LoggerModel) => Promise<Either<ErrorClass, LoggerEntity>>;
}

export class CreateLogger implements CreateLoggerUsecase {
    private readonly loggerRepository: LoggerRepository;
    constructor(loggerRepository: LoggerRepository) {
        this.loggerRepository = loggerRepository;
    }
    async execute(loggerData: LoggerModel): Promise<Either<ErrorClass, LoggerEntity>> {
        return await this.loggerRepository.createLogger(loggerData)
    }
}

