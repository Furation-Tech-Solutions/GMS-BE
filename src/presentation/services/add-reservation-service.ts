import { NextFunction, Request, Response } from "express";
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { CreateAddReservationUsecase } from "@domain/add-reservation/usecases/create-add-reservation";
import { DeleteAddReservationUsecase } from "@domain/add-reservation/usecases/delete-add-reservation";
import { GetAddReservationByIdUsecase } from "@domain/add-reservation/usecases/get-add-reservation-by-id";
import { GetAllAddReservationUsecase } from "@domain/add-reservation/usecases/get-all-add-reservation";
import { UpdateAddReservationUsecase } from "@domain/add-reservation/usecases/update-add-reservation";
import {
  AddReservationEntity,
  AddReservationMapper,
  AddReservationModel,
} from "@domain/add-reservation/entities/add-reservation";

import { ShiftRepositoryImpl } from "@data/availibility/repositories/shift-repository-Imp";
import * as moment from "moment-timezone";

import EmailService from "./send-mail";
import WhatsAppService from "./whatsapp-services";
import EmailHandler from "@presentation/nodemailer/configuration/mail-handler";
import { TableBlockCheckUsecase } from "@domain/add-reservation/usecases/table-block-check";
import {
  IRFilter,
  ReservedTable,
  TReservationCover,
} from "types/add-reservation-filter.ts/filter-type";
import { ShiftDataSourceImpl } from "@data/availibility/datasource/shift-datasource";
import mongoose from "mongoose";
import { generateTimeSlots } from "@presentation/utils/get-shift-time-slots";
import { sendMailConfirmedReservations } from "@presentation/middlewares/node-cron/cron";
import { AddReservation } from "@data/add-reservation/models/add-reservation-model";

import { Table } from "@data/table/models/table-model";
import logger from "@presentation/logger";
import { formatTimeAmPm } from "@presentation/utils/time-format-am-pm";
import { LogModel } from "@data/logger/models/logger-model";
import { TableDataSourceImpl } from "@data/table/datasources/table-data-source";
import { AddReservationDataSourceImpl } from "@data/add-reservation/datasources/add-reservation-data-source";

export class AddReservationServices {
  private readonly createAddReservationUsecase: CreateAddReservationUsecase;
  private readonly deleteAddReservationUsecase: DeleteAddReservationUsecase;
  private readonly getAddReservationByIdUsecase: GetAddReservationByIdUsecase;
  private readonly getAllAddReservationUsecase: GetAllAddReservationUsecase;
  private readonly updateAddReservationUsecase: UpdateAddReservationUsecase;
  private readonly tableBlockCheckUsecase: TableBlockCheckUsecase;
  private readonly emailService: EmailService;
  private readonly whatsAppService: WhatsAppService;
  private readonly tableDataSourceImpl: TableDataSourceImpl;

  private readonly shiftDataSourceImpl: ShiftDataSourceImpl;
  private readonly addReservationDataSourceImpl: AddReservationDataSourceImpl;

  constructor(
    createAddReservationUsecase: CreateAddReservationUsecase,
    deleteAddReservationUsecase: DeleteAddReservationUsecase,
    getAddReservationByIdUsecase: GetAddReservationByIdUsecase,
    getAllAddReservationUsecase: GetAllAddReservationUsecase,
    updateAddReservationUsecase: UpdateAddReservationUsecase,
    tableBlockCheckUsecase: TableBlockCheckUsecase,
    emailService: EmailService,
    whatsAppService: WhatsAppService
  ) {
    this.createAddReservationUsecase = createAddReservationUsecase;
    this.deleteAddReservationUsecase = deleteAddReservationUsecase;
    this.getAddReservationByIdUsecase = getAddReservationByIdUsecase;
    this.getAllAddReservationUsecase = getAllAddReservationUsecase;
    this.updateAddReservationUsecase = updateAddReservationUsecase;
    this.tableBlockCheckUsecase = tableBlockCheckUsecase;
    this.emailService = emailService;
    this.whatsAppService = whatsAppService;
    this.shiftDataSourceImpl = new ShiftDataSourceImpl(mongoose.connection);
    this.tableDataSourceImpl = new TableDataSourceImpl(mongoose.connection);
    this.addReservationDataSourceImpl = new AddReservationDataSourceImpl(
      mongoose.connection
    );
  }

  async createAddReservation(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user;

      const newReservationData = {
        ...req.body,
        reservationStatus: req.body.reservationStatus
          ? req.body.reservationStatus.toLowerCase()
          : undefined,
        createdBy: user._id,
        updatedBy: user._id,
      };
      const addReservationData: AddReservationModel =
        AddReservationMapper.toModel(newReservationData);
      const newAddReservation: Either<ErrorClass, AddReservationEntity> =
        await this.createAddReservationUsecase.execute(addReservationData);

      newAddReservation.cata(
        async (error: ErrorClass) =>
          res.status(error.status).json({ error: error.message }),
        async (result: AddReservationEntity) => {
          const resData = AddReservationMapper.toEntity(result, true);

          //called the get reservation by id to send populated data to email template
          const addReservationId: string | undefined = resData._id;
          if (addReservationId) {
            const emailhandler = new EmailHandler();
            await emailhandler.handleReservation(addReservationId);
          }

          const time = formatTimeAmPm(resData.timeSlot);

          logger.info(
            `${user.firstName} added a Reservation at ${time} for ${resData.noOfGuests} guests`
          );
          return res.json(resData);
        }
      );
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteAddReservation(req: Request, res: Response): Promise<void> {
    const addReservationId: string = req.params.addReservationId;

    const deletedAddReservation: Either<ErrorClass, void> =
      await this.deleteAddReservationUsecase.execute(addReservationId);

    deletedAddReservation.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: void) => {
        return res.json({
          message: "Reservation deleted successfully.",
        });
      }
    );
  }

  async tableBlockCheck(req: Request, res: Response): Promise<void> {
    const user = req.user;
    const tableId: string = req.params.tableId;

    const reservationDetails = {
      ...req.body,
      reservationStatus: req.body.reservationStatus
        ? req.body.reservationStatus.toLowerCase()
        : undefined,
      updatedBy: user._id,
    };

    const checkedTable: Either<ErrorClass, AddReservationEntity[]> =
      await this.tableBlockCheckUsecase.execute(tableId, reservationDetails);

    checkedTable.cata(
      (error: ErrorClass) => {
        res.status(error.status).json({ error: error.message });
      },
      (result: AddReservationEntity[]) => {
        const responseData = result.map((result) =>
          AddReservationMapper.toEntity(result)
        );
        return res.json(responseData);
      }
    );
  }

  async getAddReservationById(req: Request, res: Response): Promise<void> {
    const addReservationId: string = req.params.addReservationId;

    const addReservation: Either<ErrorClass, AddReservationEntity> =
      await this.getAddReservationByIdUsecase.execute(addReservationId);

    addReservation.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: AddReservationEntity) => {
        if (!result) {
          return res.json({ message: "Reservation not found." });
        }
        const resData = AddReservationMapper.toEntity(result);
        return res.json(resData);
      }
    );
  }

  async getAllAddReservation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { status, table, sort, search } = req.query;
    let shift = req.query.shift as string;
    const date = req.query.date as string;

    const coverflow = req.query.coverflow as string;

    const allShifts = await this.shiftDataSourceImpl.getAll();

    const timeSlots = generateTimeSlots(shift, date, allShifts);

    const filter: IRFilter = {};

    if (timeSlots?.filteredShifts && coverflow) {
      shift = timeSlots?.filteredShifts[0]._id;
    }

    if (date) {
      filter.date = date;
    }

    if (shift) {
      filter.shift = shift;
    }

    if (table && typeof table === "string") {
      filter.table = table;
    }
    if (status && typeof status === "string") {
      console.log(status.toLocaleLowerCase());
      filter.reservationStatus = status.toLocaleLowerCase();
    }

    // if (date && status === "unassigned") {
    //   filter.reservationStatus = "unassigned";
    // }

    // if (table && date && status === "booked") {
    //   filter.reservationStatus = "booked";
    // }

    const addReservations: Either<ErrorClass, AddReservationEntity[]> =
      await this.getAllAddReservationUsecase.execute(filter);

    addReservations.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: AddReservationEntity[]) => {
        let responseData = result.map((addReservation) =>
          AddReservationMapper.toEntity(addReservation)
        );

        if (sort) {
          sort === "1"
            ? responseData.sort((a, b) => {
                return (
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
                );
              })
            : responseData.sort((a, b) => {
                return (
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime()
                );
              });
        }

        if (coverflow) {
          const guestsByTimeSlot: { [key: string]: number[] } = {};
          const totalGuestsByTimeSlot: { [key: string]: number } = {};

          timeSlots?.timeSlots?.forEach((timeSlot) => {
            const guestsForTimeSlot = responseData
              .filter((reservation) => reservation.timeSlot === timeSlot)
              .map((reservation) => +reservation.noOfGuests);

            guestsByTimeSlot[timeSlot] = guestsForTimeSlot;
            totalGuestsByTimeSlot[timeSlot] = guestsForTimeSlot.reduce(
              (sum, guestCount) => sum + guestCount,
              0
            );
          });

          const guestsByTimeSlotArray = Object.keys(guestsByTimeSlot).map(
            (key) => ({
              timeSlot: key,
              guests: guestsByTimeSlot[key],
              totalGuests: totalGuestsByTimeSlot[key],
            })
          );

          return res.json({
            totalGuestsByTimeSlot,
            guestsByTimeSlotArray,
          });
        }

        // Split responseData into two arrays based on reservationStatus
        const cancelAndNotifyReservations = responseData.filter(
          (reservation) => reservation.reservationStatus === "cancelled and notify"
        );

        const otherReservations = responseData.filter(
          (reservation) => reservation.reservationStatus !== "cancelled and notify"
        );

        // Concatenate otherReservations and cancelAndNotifyReservations
        responseData = otherReservations.concat(cancelAndNotifyReservations);

        // sendMailConfirmedReservations()
        return res.json(responseData);
      }
    );
  }

  async updateAddReservation(req: Request, res: Response): Promise<void> {
    const addReservationId: string = req.params.addReservationId;
    const user = req.user;
    const newReservationData = {
      ...req.body,
      reservationStatus: req.body.reservationStatus
        ? req.body.reservationStatus.toLowerCase()
        : undefined,
      updatedBy: user._id,
    };
    const addReservationData: AddReservationModel = newReservationData;

    const existingAddReservation: Either<ErrorClass, AddReservationEntity> =
      await this.getAddReservationByIdUsecase.execute(addReservationId);
    existingAddReservation.cata(
      (error: ErrorClass) => {
        res.status(error.status).json({ error: error.message });
      },
      async (existingAddReservationData: AddReservationEntity) => {
        if (existingAddReservationData === null) {
          return res.json({ message: "Reservation not found." });
        }
        const updatedAddReservationEntity: AddReservationEntity =
          AddReservationMapper.toEntity(
            addReservationData,
            true,
            existingAddReservationData
          );
        const updatedAddReservation: Either<ErrorClass, AddReservationEntity> =
          await this.updateAddReservationUsecase.execute(
            addReservationId,
            updatedAddReservationEntity
          );
        updatedAddReservation.cata(
          async (error: ErrorClass) => {
            res.status(error.status).json({ error: error.message });
          },
          async (result: AddReservationEntity) => {
            const resData = AddReservationMapper.toEntity(result, true);

            // if (resData.reservationStatus == "isLeft") {
            //called the get reservation by id to send populated data to email template
            const addReservationId: string | undefined = resData._id;

            if (addReservationId) {
              const emailhandler = new EmailHandler();
              await emailhandler.handleReservation(addReservationId);
            }
            // }
            res.json(resData);
          }
        );
      }
    );
  }

  async getAllReservationsForTableAndTime(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const date = req.query.date as string;
      const table = req.query.table as string;
      const timeSlot = req.query.time as string;

      const filter: IRFilter = {};

      if (date) {
        filter.date = date;
      }
      if (table) {
        filter.table = table;
      }

      const tableInfo = await Table.findById({ _id: table });

      const addReservations: Either<ErrorClass, AddReservationEntity[]> =
        await this.getAllAddReservationUsecase.execute(filter);

      addReservations.cata(
        (error: ErrorClass) =>
          res.status(error.status).json({ error: error.message }),
        (result: AddReservationEntity[]): any => {
          const responseData = result.map((addReservation) =>
            AddReservationMapper.toEntity(addReservation)
          );

          if (!tableInfo) {
            return res.status(404).json({ message: "Table not found" });
          }

          // Check if the table is blocked
          if (tableInfo.isBlocked) {
            return res.status(200).json({ message: "Table blocked" });
          }

          // Additional logic to check table availability
          const requestedTime = moment.tz(
            `${date}T${timeSlot}`,
            "YYYY-MM-DDTHH:mm:ss",
            "YourTimeZoneHere"
          );

          for (const reservation of responseData) {
            const reservationStartTime = moment.tz(
              `${date}T${reservation.timeSlot}`,
              "YYYY-MM-DDTHH:mm:ss",
              "YourTimeZoneHere"
            );

            const reservationEndTime = reservationStartTime
              .clone()
              .add(reservation.duration, "minutes");

            if (
              requestedTime.isBetween(
                reservationStartTime,
                reservationEndTime,
                null,
                "[]"
              )
            ) {
              return res.status(200).json({ message: "unavailable" });
            }
          }

          return res.status(200).json({ message: "available" });
        }
      );
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getAllAvailbleTables(req: Request, res: Response): Promise<void> {
    try {
      const reservtionId = req.query.id as string;

      const getReservationById = await this.addReservationDataSourceImpl.read(
        reservtionId
      );

      const filter: IRFilter = {};

      if (getReservationById) {
        filter.date = getReservationById.date;
      }

      if (getReservationById) {
        filter.shift = getReservationById.shift._id;
      }

      if (getReservationById) {
        filter.timeSlot = getReservationById.timeSlot;
      }

      const addReservations: Either<ErrorClass, AddReservationEntity[]> =
        await this.getAllAddReservationUsecase.execute(filter);

      const particularDateReservations =
        await this.addReservationDataSourceImpl.getAll({
          date: getReservationById.date,
        });

      // const reservations = await this.addReservationDataSourceImpl.getAll({});

      const allTables = await this.tableDataSourceImpl.getAllTables();

      addReservations.cata(
        (error: ErrorClass) =>
          res.status(error.status).json({ error: error.message }),
        (result: AddReservationEntity[]): any => {
          const responseData = result.map((addReservation) =>
            AddReservationMapper.toEntity(addReservation)
          );

          if (responseData.length <= 0) {
            return res
              .status(404)
              .json({ message: "not found any reservations " });
          }

          const reservedTableIds: any[] = responseData
            .map((reservation) => reservation.table)
            .filter((tableId) => tableId !== undefined);

          const availableTables = allTables.filter((table) => {
            const matchingReservedTable = reservedTableIds.find(
              (reservedTable) =>
                reservedTable._id.toString() === table._id.toString()
            );
            return !matchingReservedTable;
          });

          const reservationStartTime = moment.tz(
            `${getReservationById.date}T${getReservationById.timeSlot}`,
            "YYYY-MM-DDTHH:mm:ss",
            "YourTimeZoneHere"
          );

          const reservationEndTime = reservationStartTime
            .clone()
            .add(getReservationById.duration, "minutes");

          const conflictTables = [];

          for (const reservation of particularDateReservations) {
            const requestedTime = moment.tz(
              `${reservation.date}T${reservation.timeSlot}`,
              "YYYY-MM-DDTHH:mm:ss",
              "YourTimeZoneHere"
            );

            if (
              requestedTime.isBetween(
                reservationStartTime,
                reservationEndTime,
                null,
                "[]"
              )
            ) {
              if (reservation.table !== undefined) {
                conflictTables.push(reservation.table);
              }
            }
          }

          const updatedAvailableTables = [];

          for (const table of availableTables) {
            let isConflict = false;
            for (const conflictTableId of conflictTables) {
              if (conflictTableId !== undefined) {
                if (table._id.toString() == conflictTableId._id.toString()) {
                  isConflict = true;
                  break;
                }
              }
            }
            if (!isConflict) {
              updatedAvailableTables.push(table);
            }
          }

          return res.status(200).json(updatedAvailableTables);
        }
      );
    } catch (error: any) {
      res.status(500).json({ messsage: error.message });
    }
  }

  async getAllLogs(req: Request, res: Response): Promise<void> {
    try {
      const logs = await LogModel.find();
      res.json(logs);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
