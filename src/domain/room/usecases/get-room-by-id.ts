import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { RoomEntity } from "../entities/room";
import { RoomRepository } from "../repositories/room-repository";

export interface GetRoomByIdUsecase {
  execute: (roomData: string) => Promise<Either<ErrorClass, RoomEntity>>;
}

export class GetRoomById implements GetRoomByIdUsecase {
  private readonly roomRepository: RoomRepository;

  constructor(roomRepository: RoomRepository) {
    this.roomRepository = roomRepository;
  }

  async execute(roomId: string): Promise<Either<ErrorClass, RoomEntity>> {
    return await this.roomRepository.getRoomById(roomId);
  }
}
