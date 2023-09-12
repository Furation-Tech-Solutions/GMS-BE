import { Either } from "monet";
import { GuestEntity, GuestModel } from "../entities/guest_entities";
import { GuestRepository } from "../repositories/guest-repo";
import { ErrorClass } from "@presentation/error-handling/api-error";

export interface UpdateGuestUsecase {
  execute: (
    guestId: string,
    guestData: GuestModel
  ) => Promise<Either<ErrorClass, GuestEntity>>;
}

export class UpdateGuest implements UpdateGuestUsecase {
  private readonly guestRepository: GuestRepository;

  constructor(guestRepository: GuestRepository) {
    this.guestRepository = guestRepository;
  }

  async execute(
    guestId: string,
    guestData: GuestModel
  ): Promise<Either<ErrorClass, GuestEntity>> {
    return await this.guestRepository.updateGuest(guestId, guestData);
  }
}

