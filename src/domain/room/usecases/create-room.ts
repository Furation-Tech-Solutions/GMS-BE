import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { RoomEntity, RoomModel } from "../entities/room";
import { RoomRepository } from "../repositories/room-repository";

export interface CreateRoomUsecase {
  execute: (roomData: RoomModel) => Promise<Either<ErrorClass, RoomEntity>>;
}

export class CreateRoom implements CreateRoomUsecase {
  private readonly roomRepository: RoomRepository;

  constructor(roomRepository: RoomRepository) {
    this.roomRepository = roomRepository;
  }

  async execute(roomData: RoomModel): Promise<Either<ErrorClass, RoomEntity>> {
    return await this.roomRepository.createRoom(roomData);
  }
}
