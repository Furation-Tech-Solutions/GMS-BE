import mongoose from "mongoose";
import { Router } from "express";
import { AddReservationDataSourceImpl } from "@data/add-reservation/datasources/add-reservation-data-source";
import { AddReservationRepositoryImpl } from "@data/add-reservation/repositories/add-reservation-repo-impl";
import { CreateAddReservation } from "@domain/add-reservation/usecases/create-add-reservation";
import { DeleteAddReservation } from "@domain/add-reservation/usecases/delete-add-reservation";
import { GetAddReservationById } from "@domain/add-reservation/usecases/get-add-reservation-by-id";
import { GetAllAddReservation } from "@domain/add-reservation/usecases/get-all-add-reservation";
import { UpdateAddReservation } from "@domain/add-reservation/usecases/update-add-reservation";
import { AddReservationServices } from "@presentation/services/add-reservation-service";
import { validateReservationInputMiddleware } from "@presentation/middlewares/add-reservation/add-reservation-validator";
import { checkPermission } from "@presentation/permission/book-reservation-verify";


// Create an instance of the AddReservationDataSourceImpl and pass the mongoose connection
const addReservationDataSource = new AddReservationDataSourceImpl(
  mongoose.connection
);

// Create an instance of the AddReservationRepositoryImpl and pass the AddReservationDataSourceImpl
const addReservationRepository = new AddReservationRepositoryImpl(
  addReservationDataSource
);

// Create instances of the required use cases and pass the AddReservationRepositoryImpl
const createAddReservationUsecase = new CreateAddReservation(
  addReservationRepository
);
const deleteAddReservationUsecase = new DeleteAddReservation(
  addReservationRepository
);
const getAddReservationByIdUsecase = new GetAddReservationById(
  addReservationRepository
);
const getAllAddReservationUsecase = new GetAllAddReservation(
  addReservationRepository
);
const updateAddReservationUsecase = new UpdateAddReservation(
  addReservationRepository
);

// Initialize AddReservationServices and inject required dependencies
const addReservationService = new AddReservationServices(
  createAddReservationUsecase,
  deleteAddReservationUsecase,
  getAddReservationByIdUsecase,
  getAllAddReservationUsecase,
  updateAddReservationUsecase
);

// Create an Express router
export const addReservationRouter = Router();

// Route handling for creating a new Add Reservation
addReservationRouter.post(
  "/create",
  checkPermission(1101),
  validateReservationInputMiddleware(false),
  addReservationService.createAddReservation.bind(addReservationService)
);

// Route handling for deleting a Add Reservation by ID
addReservationRouter.delete(
  "/:addReservationId",
  addReservationService.deleteAddReservation.bind(addReservationService)
);

// Route handling for getting a Add Reservation by ID
addReservationRouter.get(
  "/:addReservationId",
  addReservationService.getAddReservationById.bind(addReservationService)
);

// Route handling for getting all Add Reservation
addReservationRouter.get(
  "/",
  addReservationService.getAllAddReservation.bind(addReservationService)
);

// Route handling for updating a Add Reservation by ID
addReservationRouter.put(
  "/:addReservationId",
  validateReservationInputMiddleware(true),
  addReservationService.updateAddReservation.bind(addReservationService)
);
