import { GuestEntity, GuestModel } from "../entities/guest_entities";
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";

export interface GuestRepository {
    createGuest(
        guest: GuestModel
    ): Promise<Either<ErrorClass, GuestEntity>>;
    deleteGuest(id: string): Promise<Either<ErrorClass, void>>;
    getGuestbyId(id: string): Promise<Either<ErrorClass, GuestEntity>>;
    updateGuest(
        id: string,
        data: GuestModel
    ): Promise<Either<ErrorClass, GuestEntity>>;
    getAllGuests(): Promise<Either<ErrorClass, GuestEntity[]>>;
}
