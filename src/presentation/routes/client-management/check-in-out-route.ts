
// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response


import { validateAdminInputMiddleware } from "@presentation/middlewares/admin/validation-admin";
import { authorziedUser } from "@presentation/middlewares/auth-middleware";
import adminView from "@presentation/Auth/admin-auth";
import { CheckInCheckOutService } from "@presentation/services/client-management/check-in-out-service";
import { CreateCheckInCheckOut } from "@domain/client-management/usecases/create-check-in-out-usecase";
import { DeleteCheckInCheckOut } from "@domain/client-management/usecases/delete-check-in-out-usecase";
import { GetCheckInCheckOutById } from "@domain/client-management/usecases/get-by-id-check-in-out-usecase";
import { UpdateCheckInCheckOut } from "@domain/client-management/usecases/update-check-in-out-usecase";
import { GetAllCheckInCheckOut } from "@domain/client-management/usecases/get-all-check-in-out-usecase";
import { CheckInCheckOutSourceImpl } from "@data/client-management/datasource/check-in-out-datasource";
import { CheckInCheckOutRepositoryImpl } from "@data/client-management/repository/check-in-out-repository-Iml";


const mongooseConnection = mongoose.connection;

// Create an instance of the AdminDataSourceImpl and pass the mongoose connection
const checkInCheckOutDataSource = new CheckInCheckOutSourceImpl(mongooseConnection);
// Create an instance of the AdminRepositoryImpl and pass the AdminDataSourceImpl
const checkInCheckOutRepository = new CheckInCheckOutRepositoryImpl(checkInCheckOutDataSource);

// Create instances of the required use cases and pass the AdminRepositoryImpl
const createCheckInCheckOutUsecase = new CreateCheckInCheckOut(checkInCheckOutRepository);
const deleteCheckInCheckOutUsecase = new DeleteCheckInCheckOut(checkInCheckOutRepository);
const getCheckInCheckOutByIdUsecase = new GetCheckInCheckOutById(checkInCheckOutRepository);
const updateCheckInCheckOutUsecase = new UpdateCheckInCheckOut(checkInCheckOutRepository);
const getAllCheckInCheckOutUsecase = new GetAllCheckInCheckOut(checkInCheckOutRepository);

// Initialize AdminService and inject required dependencies
const checkInCheckOutService = new CheckInCheckOutService(
  createCheckInCheckOutUsecase,
  deleteCheckInCheckOutUsecase,
  getCheckInCheckOutByIdUsecase,
  updateCheckInCheckOutUsecase,
  getAllCheckInCheckOutUsecase
);

// Create an Express router
export const checkInCheckOutRouter = Router();

// Route handling for creating a new admin
checkInCheckOutRouter.post(
  "/create/:reservationId",
  checkInCheckOutService.createCheckInCheckOut.bind(checkInCheckOutService)
);

// Route handling for getting an admin by ID
checkInCheckOutRouter.get(
  "/getById/:checkId",
  checkInCheckOutService.getCheckInCheckOutById.bind(checkInCheckOutService)
);

// Route handling for updating an admin by ID
checkInCheckOutRouter.put(
  "/update/:reservationId",
  checkInCheckOutService.updateCheckInCheckOut.bind(checkInCheckOutService)
);

// Route handling for deleting an admin by ID
checkInCheckOutRouter.delete(
  "/delete/:reservationId",
  checkInCheckOutService.deleteCheckInCheckOut.bind(checkInCheckOutService)
);

// Route handling for getting all admins
checkInCheckOutRouter.get("/getAll", checkInCheckOutService.getAllCheckInCheckOuts.bind(checkInCheckOutService));