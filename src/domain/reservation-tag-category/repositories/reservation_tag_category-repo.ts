import { ReservationTagCategoryEntity, ReservationTagCategoryModel } from "../entities/reservation_tag_category_entities"; // Import the TagCategoryEntity and TagCategoryModel classes
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";

export interface ReservationTagCategoryRepository {
    createReservationTagCategory(
        tagCategory: ReservationTagCategoryModel
    ): Promise<Either<ErrorClass, ReservationTagCategoryEntity>>;
    deleteReservationTagCategory(id: string): Promise<Either<ErrorClass, void>>;
    getTagReservationCategoryById(id: string): Promise<Either<ErrorClass, ReservationTagCategoryEntity>>;
    updateReservationTagCategory(
        id: string,
        data: ReservationTagCategoryModel
    ): Promise<Either<ErrorClass, ReservationTagCategoryEntity>>;
    getAllReservationTagCategories(): Promise<Either<ErrorClass, ReservationTagCategoryEntity[]>>;
}
