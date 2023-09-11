// Import necessary classes, interfaces, and dependencies
import { NextFunction, Request, Response } from "express";
import { Either } from "monet";
import { CreateRoomUsecase } from "@domain/room/usecases/create-room";
import { GetRoomByIdUsecase } from "@domain/room/usecases/get-room-by-id";
import { GetAllRoomsUsecase } from "@domain/room/usecases/get-rooms";
import { UpdateRoomUsecase } from "@domain/room/usecases/update-room";
import { DeleteRoomUsecase } from "@domain/room/usecases/delete-room";
import { RoomEntity, RoomMapper, RoomModel } from "@domain/room/entities/room";
import { ErrorClass } from "@presentation/error-handling/api-error";

export class RoomService {
  private readonly createRoomUsecase: CreateRoomUsecase;
  private readonly getRoomByIdUsecase: GetRoomByIdUsecase;
  private readonly getAllRoomsUsecase: GetAllRoomsUsecase;
  private readonly updateRoomUsecase: UpdateRoomUsecase;
  private readonly deleteRoomUsecase: DeleteRoomUsecase;

  constructor(
    createRoomUsecase: CreateRoomUsecase,
    getRoomByIdUsecase: GetRoomByIdUsecase,
    getAllRoomsUsecase: GetAllRoomsUsecase,
    updateRoomUsecase: UpdateRoomUsecase,
    deleteRoomUsecase: DeleteRoomUsecase
  ) {
    this.createRoomUsecase = createRoomUsecase;
    this.getRoomByIdUsecase = getRoomByIdUsecase;
    this.getAllRoomsUsecase = getAllRoomsUsecase;
    this.updateRoomUsecase = updateRoomUsecase;
    this.deleteRoomUsecase = deleteRoomUsecase;
  }

  async createRoom(req: Request, res: Response): Promise<void> {
    const roomData: RoomModel = RoomMapper.toModel(req.body);

    const newRoom: Either<ErrorClass, RoomEntity> =
      await this.createRoomUsecase.execute(roomData);

    newRoom.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: RoomEntity) => {
        const resData = RoomMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
  }

  async getRoomById(req: Request, res: Response): Promise<void> {
    const roomId: string = req.params.roomId;
    const room: Either<ErrorClass, RoomEntity> =
      await this.getRoomByIdUsecase.execute(roomId);

    room.cata(
      (error: ErrorClass) => {
        res.status(error.status).json({ error: error.message });
      },
      (result: RoomEntity) => {
        const resData = RoomMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
  }

  async getAllRooms(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    // Call the GetAllOutletsUsecase to get all outlets
    const rooms: Either<ErrorClass, RoomEntity[]> =
      await this.getAllRoomsUsecase.execute();

    rooms.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (rooms: RoomEntity[]) => {
        const resData = rooms.map((room) => RoomMapper.toEntity(room));
        return res.json(resData);
      }
    );
  }

  async deleteRoom(req: Request, res: Response): Promise<void> {
    const roomId: string = req.params.roomId;

    const deleteRoom = await this.deleteRoomUsecase.execute(roomId);

    deleteRoom.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: void) => {
        const resData = "Deleted successfully";
        return res.json(resData);
      }
    );
  }

  async updateRoom(req: Request, res: Response): Promise<void> {
    const roomId: string = req.params.roomId;
    const roomData: RoomModel = req.body;
    // Get the existing outlet by ID
    const existingRoom: Either<ErrorClass, RoomEntity> =
      await this.getRoomByIdUsecase.execute(roomId);

    existingRoom.cata(
      (error: ErrorClass) => {
        res.status(error.status).json({ error: error.message });
      },
      async (result: RoomEntity) => {
        const resData = RoomMapper.toEntity(result, true);
        const updatedRoomEntity: RoomEntity = RoomMapper.toEntity(
          roomData,
          true,
          resData
        );

        // Call the UpdateOutletUsecase to update the outlet
        const updatedRoom: Either<ErrorClass, RoomEntity> =
          await this.updateRoomUsecase.execute(roomId, updatedRoomEntity);

        updatedRoom.cata(
          (error: ErrorClass) => {
            res.status(error.status).json({ error: error.message });
          },
          (response: RoomEntity) => {
            // Convert updatedOutlet from OutletEntity to plain JSON object using OutletMapper
            const responseData = RoomMapper.toModel(response);

            // Send the updated outlet as a JSON response
            res.json(responseData);
          }
        );
      }
    );
  }
}
