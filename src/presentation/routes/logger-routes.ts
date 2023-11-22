


import { LoggerDataSourceImpl } from "@data/logger/datasource/logger-datasource";
import { LoggerRepositoryImpl } from "@data/logger/repository/logger-repository-impl";
import { CreateLogger } from "@domain/logger/usecases/create-logger-usecase";
import mongoose from "mongoose";
import { LoggerServices } from "@presentation/utils/logger-utility/logger-utils";
import { Router } from "express";
import { GetAllLogs } from "@domain/logger/usecases/get-all-logs-usecase";


const mongooseConnection = mongoose.connection;

const loggerDataSource = new LoggerDataSourceImpl(mongooseConnection)

const loggerRepository = new LoggerRepositoryImpl(loggerDataSource)

const createLoggerUseCase= new CreateLogger(loggerRepository)

const getLoggerUseCase = new GetAllLogs(loggerRepository)
// const deleteAccessLevelUseCase=new DeleteAccessLevel(accessLevelRepository)
// const getAccessLevelByIdUseCase=new GetAccessLevelById(accessLevelRepository)
// const updateAccessLevelUseCase=new UpdateAccessLevel(accessLevelRepository)

export const loggerService = new LoggerServices(
    createLoggerUseCase,
    getLoggerUseCase,
    // deleteAccessLevelUseCase,
    // getAccessLevelByIdUseCase,
    // updateAccessLevelUseCase
    
)

export const loggsRoute = Router();



loggsRoute.get("/alllogs", loggerService.getAlllogs.bind(loggerService));


loggsRoute.get("/alllogs/client/reservation", loggerService.getAlllogsOfClientReservations.bind(loggerService));

