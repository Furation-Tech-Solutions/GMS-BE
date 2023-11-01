import { ReservationTagEntity, ReservationTagModel } from "../entities/reservation-tag-entities"; // Import the TagCategoryEntity and TagCategoryModel classes
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";

export interface ReservationTagRepository {
    createReservationTag(
        tag: ReservationTagModel
    ): Promise<Either<ErrorClass, ReservationTagEntity>>;
    deleteReservationTag(id: string): Promise<Either<ErrorClass, void>>;
    getTagReservationById(id: string): Promise<Either<ErrorClass, ReservationTagEntity>>;
    updateReservationTag(
        id: string,
        data: ReservationTagModel
    ): Promise<Either<ErrorClass, ReservationTagEntity>>;
    getAllReservationTag(outletId:string): Promise<Either<ErrorClass, ReservationTagEntity[]>>;
}