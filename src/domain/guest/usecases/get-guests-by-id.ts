import { Either } from "monet";
import { GuestEntity, GuestModel } from "../entities/guest_entities";
import { GuestRepository } from "../repositories/guest-repo";
import { ErrorClass } from "@presentation/error-handling/api-error";

export interface GetGuestByIdUsecase {
  execute: (guestId: string) => Promise<Either<ErrorClass, GuestEntity>>;
}

export class GetGuestById implements GetGuestByIdUsecase {
  private readonly guestRepository: GuestRepository;

  constructor(guestRepository: GuestRepository) {
    this.guestRepository = guestRepository;
  }

  async execute(guestId: string): Promise<Either<ErrorClass, GuestEntity>> {
    return await this.guestRepository.getGuestbyId(guestId);
  }
}
