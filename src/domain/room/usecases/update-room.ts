import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { RoomEntity, RoomModel } from "../entities/room";
import { RoomRepository } from "../repositories/room-repository";
export interface UpdateRoomUsecase {
  execute: (
    roomId: string,
    roomData: RoomModel
  ) => Promise<Either<ErrorClass, RoomEntity>>;
}

export class UpdateRoom implements UpdateRoomUsecase {
  private readonly roomRepository: RoomRepository;

  constructor(roomRepository: RoomRepository) {
    this.roomRepository = roomRepository;
  }

  async execute(
    roomId: string,
    roomData: RoomModel
  ): Promise<Either<ErrorClass, RoomEntity>> {
    return await this.roomRepository.updateRoom(roomId, roomData);
  }
}
