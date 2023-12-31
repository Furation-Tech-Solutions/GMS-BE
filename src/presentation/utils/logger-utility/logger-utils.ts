import { NextFunction, Request, Response } from "express";

import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { CreateLoggerUsecase } from "@domain/logger/usecases/create-logger-usecase";
import {
  LoggerEntity,
  LoggerMapper,
  LoggerModel,
} from "@domain/logger/entities/logger-entity";
import { ILoggerData, IlogsFilter } from "types/logger/logger-schema-type";
import { GetAllLogsUsecase } from "@domain/logger/usecases/get-all-logs-usecase";
import { groupLogsByMonth } from "./getlogs-by-month";

export class LoggerServices {
  private readonly createLoggerUsecase: CreateLoggerUsecase;
  private readonly getAllLogsUsecase: GetAllLogsUsecase;
  //   private readonly deleteClientUsecases: DeleteClientUsecase;
  //   private readonly getClientByIdUsecases: GetClientByIdUsecase;
  //   private readonly updateClientUsecases: UpdateClientUsecase;

  constructor(
    createLoggerUsecase: CreateLoggerUsecase,
    getAllLogsUsecase: GetAllLogsUsecase
    // deleteClientUsecases: DeleteClientUsecase,
    // getClientByIdUsecases: GetClientByIdUsecase,
    // updateClientUsecases: UpdateClientUsecase
  ) {
    this.createLoggerUsecase = createLoggerUsecase;
    this.getAllLogsUsecase = getAllLogsUsecase;
    // this.deleteClientUsecases = deleteClientUsecases;
    // this.getClientByIdUsecases = getClientByIdUsecases;
    // this.updateClientUsecases = updateClientUsecases;
  }

  async createLogs(loggerData: ILoggerData): Promise<any> {
    const newlogs: Either<ErrorClass, LoggerEntity> =
      await this.createLoggerUsecase.execute(loggerData);

    newlogs.fold(
      (error: ErrorClass) => {
        console.error(error);
      },
      (result: LoggerEntity) => {
        return result;
      }
    );

    return;
  }

  async getAlllogs(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const reservationId = req.query.reservation as string;
    const clientId = req.query.client as string;

    const filter: IlogsFilter = {};

    if (clientId) {
      filter.client = clientId;
    }

    if (reservationId) {
      filter.reservation = reservationId;
    }

    // Call the GetAllAdminsUsecase to get all admins
    const allLogs: Either<ErrorClass, LoggerEntity[]> =
      await this.getAllLogsUsecase.execute(filter);

    allLogs.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (logs: LoggerEntity[]) => {
        const resData = logs.map((log) => LoggerMapper.toEntity(log));

        // Grouping logs by month and year
        const groupedLogs = groupLogsByMonth(resData);

        return res.status(200).json(groupedLogs);
      }
    );
  }

  async getAlllogsOfClientReservations(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const clientId = req.query.client as string;

    const filter: IlogsFilter = {};

    if (clientId) {
      filter.client = clientId;
    }

    // Call the GetAllAdminsUsecase to get all admins
    const allLogs: Either<ErrorClass, LoggerEntity[]> =
      await this.getAllLogsUsecase.execute(filter);

    allLogs.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (logs: LoggerEntity[]) => {
        const resData = logs.map((log) => LoggerMapper.toEntity(log));
        return res.status(200).json(resData);
      }
    );
  }
}

/*
[
  {
    monthYear: "Jan 2023",
    logs: [
      {
        level: "info",
        timestamp: "Tue, Jan 5, 2023, 12:26:33",
        message: "Kiran added a Reservation at 09:00 PM for 6 guests",
      },
    ],
  },
];
*/
