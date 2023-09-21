// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { ReservationStatusDataSourceImpl } from "@data/reservation-status/datasources/reservation-status-data-source";
import { ReservationStatusRepositoryImpl } from "@data/reservation-status/repositories/reservation-status-repository-impl";
import { CreateReservationStatus } from "@domain/reservation-status/usecases/create-reservation-status";
import { ReservationStatusService } from "@presentation/services/reservation-status-service";
import { GetReservationStatusById } from "@domain/reservation-status/usecases/get-reservation-status-by-id";
import { GetAllReservationStatus } from "@domain/reservation-status/usecases/get-reservation-status";
import { UpdateReservationStatus } from "@domain/reservation-status/usecases/update-reservation-status";
import { DeleteReservationStatus } from "@domain/reservation-status/usecases/delete-reservation-status";
import { validateReservationStatusInputMiddleware } from "@presentation/middlewares/reservationStatus/validation-reservation-status";

const mongooseConnection = mongoose.connection;
// Create an instance of the RoomDataSourceImpl and pass the mongoose connection
const reservationStatusDataSource = new ReservationStatusDataSourceImpl(
  mongooseConnection
);

// Create an instance of the RoomRepositoryImpl and pass the RoomDataSourceImpl
const reservationStatusRepository = new ReservationStatusRepositoryImpl(
  reservationStatusDataSource
);

// Create instances of the required use cases and pass the ReservationStatusRepositoryImpl
const createReservationStatusUsecase = new CreateReservationStatus(
  reservationStatusRepository
);
const getReservationStatusByIdUsecase = new GetReservationStatusById(
  reservationStatusRepository
);
const getReservationStatusUsecase = new GetAllReservationStatus(
  reservationStatusRepository
);
const updateReservationStatusUsecase = new UpdateReservationStatus(
  reservationStatusRepository
);
const deleteReservationStatusUsecase = new DeleteReservationStatus(
  reservationStatusRepository
);

// Initialize OutletService and inject required dependencies
const reservationStatusService = new ReservationStatusService(
  createReservationStatusUsecase,
  getReservationStatusByIdUsecase,
  getReservationStatusUsecase,
  updateReservationStatusUsecase,
  deleteReservationStatusUsecase
);

// Create an Express router
export const reservationStatusRouter = Router();

// Route handling for creating a new Room
reservationStatusRouter.post(
  "/create",
  validateReservationStatusInputMiddleware(false),
  reservationStatusService.createReservationStatus.bind(
    reservationStatusService
  )
);

//Route handling for getReservationStatusById
reservationStatusRouter.get(
  "/getById/:reservationStatusId",
  reservationStatusService.getReservationStatusById.bind(
    reservationStatusService
  )
);

//Route hanndling for getRooms
reservationStatusRouter.get(
  "/getAllReservationStatus",
  reservationStatusService.getAllReservationStatus.bind(
    reservationStatusService
  )
);

reservationStatusRouter.put(
  "/updateReservationStatus/:reservationStatusId",
  validateReservationStatusInputMiddleware(true),
  reservationStatusService.updateReservationStatus.bind(
    reservationStatusService
  )
);

reservationStatusRouter.delete(
  "/deleteReservationStatus/:reservationStatusId",
  reservationStatusService.deleteReservationStatus.bind(
    reservationStatusService
  )
);
