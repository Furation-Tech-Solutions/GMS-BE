import { RoomRepository } from "@domain/room/repositories/room-repository";
import { RoomDataSource } from "../datasources/room-data-source";
import { RoomEntity, RoomModel } from "@domain/room/entities/room";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { Either, Left, Right } from "monet";

export class RoomRepositoryImpl implements RoomRepository {
  private readonly dataSource: RoomDataSource;

  constructor(dataSource: RoomDataSource) {
    this.dataSource = dataSource;
  }

  async createRoom(room: RoomModel): Promise<Either<ErrorClass, RoomEntity>> {
    try {
      let i = await this.dataSource.create(room);
      return Right<ErrorClass, RoomEntity>(i);
    } catch (e) {
      if (typeof ApiError.emailExist) {
        return Left<ErrorClass, RoomEntity>(ApiError.emailExist());
      }
      return Left<ErrorClass, RoomEntity>(ApiError.badRequest());
    }
  }

  async getRoomById(roomId: string): Promise<Either<ErrorClass, RoomEntity>> {
    try {
      let i = await this.dataSource.getById(roomId);
      return Right<ErrorClass, RoomEntity>(i);
    } catch (e) {
      if (typeof e === typeof ApiError.notFound) {
        return Left<ErrorClass, RoomEntity>(ApiError.notFound());
      }
      return Left<ErrorClass, RoomEntity>(ApiError.internalError());
    }
  }
  
  async getRooms(): Promise<Either<ErrorClass, RoomEntity[]>> {
    try {
      const response = await this.dataSource.getAllRooms();
      return Right<ErrorClass, RoomEntity[]>(response);
    } catch (error) {
      if (typeof error === typeof ApiError.notFound) {
        return Left<ErrorClass, RoomEntity[]>(ApiError.notFound());
      }
      return Left<ErrorClass, RoomEntity[]>(ApiError.internalError());
    }
  }

  async updateRoom(
    id: string,
    data: RoomModel
  ): Promise<Either<ErrorClass, RoomEntity>> {
    try {
      const response = await this.dataSource.update(id, data);
      return Right<ErrorClass, RoomEntity>(response);
    } catch (e) {
      if (typeof e === typeof ApiError.notFound) {
        return Left<ErrorClass, RoomEntity>(ApiError.notFound());
      }
      return Left<ErrorClass, RoomEntity>(ApiError.internalError());
    }
  }
  async deleteRoom(id: string): Promise<Either<ErrorClass, void>> {
    try {
      const i = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(i);
    } catch (error) {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }
}
