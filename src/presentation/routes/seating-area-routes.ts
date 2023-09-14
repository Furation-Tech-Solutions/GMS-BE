// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { SeatingAreaDataSourceImpl } from "@data/seating-area/datasources/seating-area-data-source";
import { SeatingAreaRepositoryImpl } from "@data/seating-area/repositories/seating-area-repository-impl";
import { CreateSeatingArea } from "@domain/seating-area/usecases/create-seating-area";
import { GetSeatingAreaById } from "@domain/seating-area/usecases/get-seating-area-by-id";
import { GetAllSeatingAreas } from "@domain/seating-area/usecases/get-seating-area";
import { UpdateSeatingArea } from "@domain/seating-area/usecases/update-room";
import { DeleteSeatingArea } from "@domain/seating-area/usecases/delete-seating-area";
import { SeatingAreaService } from "@presentation/services/seatng-area-services";
import validateSeatingAreaInputMiddleware from "@presentation/middlewares/seatingArea/validation-seating-area";

const mongooseConnection = mongoose.connection;
// Create an instance of the SeatingDataSourceImpl and pass the mongoose connection
const seatingAreaDataSource = new SeatingAreaDataSourceImpl(mongooseConnection);

// Create an instance of the SeatingAreaRepositoryImpl and pass the RoomDataSourceImpl
const seatingAreaRepository = new SeatingAreaRepositoryImpl(
  seatingAreaDataSource
);

// Create instances of the required use cases and pass the SeatingAreaRepositoryImpl
const createSeatingAreaUsecase = new CreateSeatingArea(seatingAreaRepository);
const getSeatingAreaByIdUsecase = new GetSeatingAreaById(seatingAreaRepository);
const getSeatingAreasUsecase = new GetAllSeatingAreas(seatingAreaRepository);
const updateSeatingAreaUsecase = new UpdateSeatingArea(seatingAreaRepository);
const deleteSeatingAreaUsecase = new DeleteSeatingArea(seatingAreaRepository);

// Initialize seatingAreaService and inject required dependencies
const seatingAreaService = new SeatingAreaService(
  createSeatingAreaUsecase,
  getSeatingAreaByIdUsecase,
  getSeatingAreasUsecase,
  updateSeatingAreaUsecase,
  deleteSeatingAreaUsecase
);

// Create an Express router
export const seatingAreaRouter = Router();

// Route handling for creating a new Room
seatingAreaRouter.post(
  "/create",
  validateSeatingAreaInputMiddleware(false),
  seatingAreaService.createSeatingArea.bind(seatingAreaService)
);

//Route handling for getRoomById
seatingAreaRouter.get(
  "/getById/:seatingAreaId",
  seatingAreaService.getSeatingAreaById.bind(seatingAreaService)
);

//Route hanndling for getRooms
seatingAreaRouter.get(
  "/getAllseatingAreas",
  seatingAreaService.getAllSeatingAreas.bind(seatingAreaService)
);

seatingAreaRouter.put(
  "/updateSeatingArea/:seatingAreaId",
  validateSeatingAreaInputMiddleware(true),
  seatingAreaService.updateSeatingArea.bind(seatingAreaService)
);

seatingAreaRouter.delete(
  "/deleteSeatingArea/:seatingAreaId",
  seatingAreaService.deleteSeatingArea.bind(seatingAreaService)
);
