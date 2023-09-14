import { RoomEntity, RoomModel } from "../entities/room";
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";


export interface RoomRepository {
  createRoom(room: RoomModel): Promise<Either<ErrorClass, RoomEntity>>;
  getRoomById(id: string): Promise<Either<ErrorClass, RoomEntity>>;
  getRooms(): Promise<Either<ErrorClass, RoomEntity[]>>;
  updateRoom(
    id: string,
    room: RoomModel
  ): Promise<Either<ErrorClass, RoomEntity>>;
  deleteRoom(id: string): Promise<Either<ErrorClass, void>>;
}
