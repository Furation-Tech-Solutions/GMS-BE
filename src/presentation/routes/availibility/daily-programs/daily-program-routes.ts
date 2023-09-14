// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { ProgramScheduleRepositoryImpl } from "@data/availibility/repositories/daily-programs-repository-imp";
import { ProgramScheduleDataSourceImpl } from "@data/availibility/datasource/daily-programs-datasource";
import { CreateProgramSchedule } from "@domain/availibility/usecases/daily-programs/create-usecase";
import { UpdateProgramSchedule } from "@domain/availibility/usecases/daily-programs/update-usecase";
import { GetProgramScheduleById } from "@domain/availibility/usecases/daily-programs/get-by-id-usecase";
import { DeleteProgramSchedule } from "@domain/availibility/usecases/daily-programs/delete-usecase";
import { GetAllProgramSchedule } from "@domain/availibility/usecases/daily-programs/getall-usecase";
import { ProgramScheduleService } from "@presentation/services/availibility/daily-programs/daily-programs-services";
import { validateProgramScheduleInputMiddleware } from "@presentation/middlewares/avaibility/program-schedule/program-schedule-validation";



const mongooseConnection = mongoose.connection;

// Create an instance of the AdminDataSourceImpl and pass the mongoose connection
const programScheduleDataSource = new ProgramScheduleDataSourceImpl(mongooseConnection);
// Create an instance of the AdminRepositoryImpl and pass the AdminDataSourceImpl
const programScheduleRepository = new ProgramScheduleRepositoryImpl(programScheduleDataSource);

// Create instances of the required use cases and pass the AdminRepositoryImpl
const createProgramScheduleUsecase = new CreateProgramSchedule(programScheduleRepository);
const updateProgramScheduleUsecase = new UpdateProgramSchedule(programScheduleRepository);
const getProgramScheduleByIdUsecase = new GetProgramScheduleById(programScheduleRepository);
const deleteProgramScheduleUsecase = new DeleteProgramSchedule(programScheduleRepository);
const getAllProgramScheduleUsecase = new GetAllProgramSchedule(programScheduleRepository);

// Initialize AdminService and inject required dependencies
const programScheduleService = new ProgramScheduleService(
    createProgramScheduleUsecase,
    deleteProgramScheduleUsecase,
    getProgramScheduleByIdUsecase,
    updateProgramScheduleUsecase,
    getAllProgramScheduleUsecase
);


// Create an Express router
export const programScheduleRouter = Router();

// Route handling for creating a new programSchedule
programScheduleRouter.post("/create", validateProgramScheduleInputMiddleware, programScheduleService.createProgramSchedule.bind(programScheduleService));

// Route handling for updating an programSchedule by ID
programScheduleRouter.put("/update/:programId",programScheduleService.updateProgramSchedule.bind(programScheduleService));

// Route handling for getting an programSchedule by ID
programScheduleRouter.get("/getbyid/:programId",programScheduleService.getProgramScheduleById.bind(programScheduleService));

// Route handling for deleting an programSchedule by ID
programScheduleRouter.delete("/delete/:programId", programScheduleService.deleteProgramSchedule.bind(programScheduleService));

// Route handling for getting all programSchedule
programScheduleRouter.get("/getAll", programScheduleService.getAllProgramSchedule.bind(programScheduleService));
