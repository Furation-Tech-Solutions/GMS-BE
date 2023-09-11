import { Either } from "monet";
import { GuestRepository } from "../repositories/guest-repo";
import { ErrorClass } from "@presentation/error-handling/api-error";

export interface DeleteGuestUsecase {
    execute: (guestID: string) => Promise<Either<ErrorClass, void>>;
}

export class DeleteGuest implements DeleteGuestUsecase {
    private readonly guestRepository: GuestRepository;

    constructor(guestRepository: GuestRepository) {
        this.guestRepository = guestRepository;
    }

    async execute(guestID: string): Promise<Either<ErrorClass, void>> {
        return await this.guestRepository.deleteGuest(guestID);
    }
}
