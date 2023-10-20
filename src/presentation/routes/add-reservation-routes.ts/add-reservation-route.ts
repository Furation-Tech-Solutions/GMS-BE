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
import { checkPermission } from "@presentation/permission/permission-middleware";
import { verifyLoggedInUser } from "@presentation/middlewares/auth-middleware";
import EmailService from "@presentation/services/send-mail";
import WhatsAppService from "@presentation/services/whatsapp-services";
import { TableBlockCheck } from "@domain/add-reservation/usecases/table-block-check";
// import { checkPermission } from "@presentation/permission/permission-middleware";

// Create an instance of the AddReservationDataSourceImpl and pass the mongoose connection
const addReservationDataSource = new AddReservationDataSourceImpl(
  mongoose.connection
);

// Create an instance of the AddReservationRepositoryImpl and pass the AddReservationDataSourceImpl
const addReservationRepository = new AddReservationRepositoryImpl(
  addReservationDataSource
);
const emailService = new EmailService();
const whatsappService = new WhatsAppService();

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
const checkTableBlockUsecase = new TableBlockCheck(addReservationRepository);

// Initialize AddReservationServices and inject required dependencies
const addReservationService = new AddReservationServices(
  createAddReservationUsecase,
  deleteAddReservationUsecase,
  getAddReservationByIdUsecase,
  getAllAddReservationUsecase,
  updateAddReservationUsecase,
  checkTableBlockUsecase,
  emailService,
  whatsappService
);

// Create an Express router
export const addReservationRouter = Router();

// Route handling for creating a new Add Reservation
addReservationRouter.post(
  "/create",
  verifyLoggedInUser,
  checkPermission([102,202,301]),
  validateReservationInputMiddleware(false),
  addReservationService.createAddReservation.bind(addReservationService)
);

// Route handling for deleting a Add Reservation by ID
addReservationRouter.delete(
  "/:addReservationId",
  checkPermission([104,204,302]),

  addReservationService.deleteAddReservation.bind(addReservationService)
);

// Route handling for getting a Add Reservation by ID
addReservationRouter.get(
  "/:addReservationId",
  // checkPermission(["1101","5101"]),
  addReservationService.getAddReservationById.bind(addReservationService)
);

// Route handling for getting all Add Reservation
addReservationRouter.get(
  "/",
  // checkPermission(["1101"]),
  addReservationService.getAllAddReservation.bind(addReservationService)
);

// Route handling for updating a Add Reservation by ID
addReservationRouter.put(
  "/:addReservationId",
  verifyLoggedInUser,
  checkPermission([103,203,303,304]),
  validateReservationInputMiddleware(true),
  addReservationService.updateAddReservation.bind(addReservationService)
);
// Route handling for updating a Add Reservation by ID
addReservationRouter.get(
  "/:tableId",
  verifyLoggedInUser,
  // checkPermission(["1101","5101"]),
  validateReservationInputMiddleware(true),
  addReservationService.tableBlockCheck.bind(addReservationService)
);
