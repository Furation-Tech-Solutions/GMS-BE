import { ErrorClass } from "@presentation/error-handling/api-error";
import { GuestEntity, GuestModel } from "../entities/guest_entities";
import { GuestRepository } from "../repositories/guest-repo";
import { Either, Right, Left } from "monet";

export interface CreateGuestUsecase {
    execute: (guestData: GuestModel) => Promise<Either<ErrorClass, GuestEntity>>;
}

export class CreateGuest implements CreateGuestUsecase {
    private readonly guestRepository: GuestRepository;
    constructor(guestRepository: GuestRepository) {
        this.guestRepository = guestRepository;
    }
    async execute(guestData: GuestModel): Promise<Either<ErrorClass, GuestEntity>> {
        return await this.guestRepository.createGuest(guestData);
    }
}

