// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { BlackoutDayService } from "@presentation/services/availibility/black-out-day/black-out-day-services";
import { CreateBlackouDay } from "@domain/availibility/usecases/black-out-day/create-usecase";
import { BlackoutDayDataSourceImpl } from "@data/availibility/datasource/black-out-day-datasource";
import { BlackoutDayRepositoryImpl } from "@data/availibility/repositories/black-out-day-repository-Imp";
import { DeleteBlackouDay } from "@domain/availibility/usecases/black-out-day/delete-usecase";
import { GetBlackouDayById } from "@domain/availibility/usecases/black-out-day/get-by-id-usecase";
import { UpdateBlackouDay } from "@domain/availibility/usecases/black-out-day/update-usecase";
import { GetAllBlackouDay } from "@domain/availibility/usecases/black-out-day/getall-usecase";



const mongooseConnection = mongoose.connection;

// Create an instance of the blackoutDayDataSourceImpl and pass the mongoose connection
const blackoutDayDataSource = new BlackoutDayDataSourceImpl(mongooseConnection);
// Create an instance of the blackoutDayRepositoryImpl and pass the blackoutDayDataSourceImpl
const blackoutDayRepository = new BlackoutDayRepositoryImpl(blackoutDayDataSource);

// Create instances of the required use cases and pass the blackoutDayRepositoryImpl
const createBlackouDayUsecase = new CreateBlackouDay(blackoutDayRepository);
const deleteBlackouDayUsecase = new DeleteBlackouDay(blackoutDayRepository);
const getBlackouDayByIdUsecase = new GetBlackouDayById(blackoutDayRepository);
const updateBlackouDayUsecase = new UpdateBlackouDay(blackoutDayRepository);
const getAllBlackouDayUsecase = new GetAllBlackouDay(blackoutDayRepository);

// Initialize blackoutDayService and inject required dependencies
const blackoutDayService = new BlackoutDayService(
    createBlackouDayUsecase,
    deleteBlackouDayUsecase,
    getBlackouDayByIdUsecase,
    updateBlackouDayUsecase,
    getAllBlackouDayUsecase
);

// Create an Express router
export const blackoutDayRouter = Router();

// Route handling for creating a new blackoutDay
blackoutDayRouter.post("/create", blackoutDayService.createBlackouDay.bind(blackoutDayService));

// Route handling for updating an blackoutDay by ID
blackoutDayRouter.put("/update/:blackoutId",blackoutDayService.updateBlackouDay.bind(blackoutDayService));

// Route handling for getting an blackoutDay by ID
blackoutDayRouter.get("/getbyid/:blackoutId",blackoutDayService.getBlackouDayById.bind(blackoutDayService));

// Route handling for deleting an blackoutDay by ID
blackoutDayRouter.delete("/delete/:blackoutId", blackoutDayService.deleteBlackouDay.bind(blackoutDayService));

// Route handling for getting all blackoutDays
blackoutDayRouter.get("/getAll", blackoutDayService.getAllBlackouDay.bind(blackoutDayService));
