import { Either } from "monet";
import { GuestEntity, GuestModel } from "../entities/guest_entities";
import { GuestRepository } from "../repositories/guest-repo";
import { ErrorClass } from "@presentation/error-handling/api-error";

export interface GetAllGuestsUsecase {
  execute: () => Promise<Either<ErrorClass, GuestEntity[]>>;
}

export class GetAllGuests implements GetAllGuestsUsecase {
  private readonly guestRepository: GuestRepository;
  constructor(guestRepository: GuestRepository) {
    this.guestRepository = guestRepository;
  }

  async execute(): Promise<Either<ErrorClass, GuestEntity[]>> {
    return await this.guestRepository.getAllGuests();
  }
}
