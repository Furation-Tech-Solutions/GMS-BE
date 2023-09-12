// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { ShiftDataSourceImpl } from "@data/availibility/datasource/shift-datasource";
import { ShiftRepositoryImpl } from "@data/availibility/repositories/shift-repository-Imp";
import { CreateShift } from "@domain/availibility/usecases/shift-usecase/create-usecase";
import { ShiftService } from "@presentation/services/availibility/shift/shift-services";
import { UpdateShift } from "@domain/availibility/usecases/shift-usecase/update-usecase";
import { GetShiftById } from "@domain/availibility/usecases/shift-usecase/get-shift-by-id.usecase";
import { DeleteShift } from "@domain/availibility/usecases/shift-usecase/delete-usecase";
import { GetAllShifts } from "@domain/availibility/usecases/shift-usecase/getall-shifts-usecase";
import { validateShiftInputMiddleware } from "@presentation/middlewares/avaibility/shift/shift-validation";



const mongooseConnection = mongoose.connection;

// Create an instance of the AdminDataSourceImpl and pass the mongoose connection
const shiftDataSource = new ShiftDataSourceImpl(mongooseConnection);
// Create an instance of the AdminRepositoryImpl and pass the AdminDataSourceImpl
const shiftRepository = new ShiftRepositoryImpl(shiftDataSource);

// Create instances of the required use cases and pass the AdminRepositoryImpl
const createShiftUsecase = new CreateShift(shiftRepository);
const updateShiftUsecase = new UpdateShift(shiftRepository);
const getShiftByIdUsecase = new GetShiftById(shiftRepository);
const deleteShiftUsecase = new DeleteShift(shiftRepository);
const getAllShiftsUsecase = new GetAllShifts(shiftRepository);

// Initialize AdminService and inject required dependencies
const shiftService = new ShiftService(
    createShiftUsecase,
    updateShiftUsecase,
    getShiftByIdUsecase,
    deleteShiftUsecase,
    getAllShiftsUsecase
);

// Create an Express router
export const shiftRouter = Router();

// Route handling for creating a new admin
shiftRouter.post("/create", shiftService.createShift.bind(shiftService));

// Route handling for updating an shift by ID
shiftRouter.put("/update/:shiftId/:action", shiftService.updateShift.bind(shiftService));

// Route handling for getting an shift by ID
shiftRouter.get("/getbyid/:shiftId",shiftService.getShiftById.bind(shiftService));

// Route handling for deleting an admin by ID
shiftRouter.delete("/delete/:shiftId", shiftService.deleteShift.bind(shiftService));

// Route handling for getting all shifts
shiftRouter.get("/getAll", shiftService.getAllShifts.bind(shiftService));
