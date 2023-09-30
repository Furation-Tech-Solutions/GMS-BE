// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { RoomDataSourceImpl } from "@data/room/datasources/room-data-source";
import { RoomRepositoryImpl } from "@data/room/repositories/room-repository-impl";
import { UpdateRoom } from "@domain/room/usecases/update-room";
import { DeleteRoom } from "@domain/room/usecases/delete-room";
import { GetAllRooms } from "@domain/room/usecases/get-rooms";
import { GetRoomById } from "@domain/room/usecases/get-room-by-id";
import { CreateRoom } from "@domain/room/usecases/create-room";
import { validateRoomInputMiddleware } from "@presentation/middlewares/room/validation-room";
import { RoomService } from "@presentation/services/room-service";
import { verifyLoggedInUser } from "@presentation/middlewares/auth-middleware";
// import { checkPermission } from "@presentation/permission/permission-middleware";

const mongooseConnection = mongoose.connection;
// Create an instance of the RoomDataSourceImpl and pass the mongoose connection
const roomDataSource = new RoomDataSourceImpl(mongooseConnection);

// Create an instance of the RoomRepositoryImpl and pass the RoomDataSourceImpl
const roomRepository = new RoomRepositoryImpl(roomDataSource);

// Create instances of the required use cases and pass the RoomRepositoryImpl
const createRoomUsecase = new CreateRoom(roomRepository);
const getRoomByIdUsecase = new GetRoomById(roomRepository);
const getRoomsUsecase = new GetAllRooms(roomRepository);
const updateRoomUsecase = new UpdateRoom(roomRepository);
const deleteRoomUsecase = new DeleteRoom(roomRepository);

// Initialize OutletService and inject required dependencies
const roomService = new RoomService(
  createRoomUsecase,
  getRoomByIdUsecase,
  getRoomsUsecase,
  updateRoomUsecase,
  deleteRoomUsecase
);

// Create an Express router
export const roomRouter = Router();

// Route handling for creating a new Room
roomRouter.post(
  "/create",
//  checkPermission(["1103"]),
  validateRoomInputMiddleware(false),
verifyLoggedInUser,
  roomService.createRoom.bind(roomService)
);

//Route handling for getRoomById
roomRouter.get("/getById/:roomId",
// checkPermission("1103"),
 roomService.getRoomById.bind(roomService));

//Route hanndling for getRooms
roomRouter.get("/getAllRooms",
 roomService.getAllRooms.bind(roomService));

roomRouter.put(
  "/updateRoom/:roomId",
// checkPermission(["1103"]),
  validateRoomInputMiddleware(true),
verifyLoggedInUser,
  roomService.updateRoom.bind(roomService)
);

roomRouter.delete(
  "/deleteRoom/:roomId",
// checkPermission(["1103"]),
  roomService.deleteRoom.bind(roomService)
);
