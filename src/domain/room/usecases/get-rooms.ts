import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { RoomEntity } from "../entities/room";
import { RoomRepository } from "../repositories/room-repository";
export interface GetAllRoomsUsecase {
  execute: () => Promise<Either<ErrorClass, RoomEntity[]>>;
}

export class GetAllRooms implements GetAllRoomsUsecase {
  private readonly roomRepository: RoomRepository;

  constructor(roomRepository: RoomRepository) {
    this.roomRepository = roomRepository;
  }

  async execute(): Promise<Either<ErrorClass, RoomEntity[]>> {
    return await this.roomRepository.getRooms();
  }
}
