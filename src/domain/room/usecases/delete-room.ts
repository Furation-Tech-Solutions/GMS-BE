import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { RoomRepository } from "../repositories/room-repository";
export interface DeleteRoomUsecase {
  execute: (roomId: string) => Promise<Either<ErrorClass, void>>;
}
export class DeleteRoom implements DeleteRoomUsecase {
  private readonly roomRepository: RoomRepository;
  constructor(roomRepository: RoomRepository) {
    this.roomRepository = roomRepository;
  }
  async execute(roomId: string): Promise<Either<ErrorClass, void>> {
    return await this.roomRepository.deleteRoom(roomId);
  }
}
