import { ErrorClass } from "@presentation/error-handling/api-error";
import { ReservationTagCategoryEntity, ReservationTagCategoryModel } from "../entities/reservation_tag_category_entities"; // Import the reservation TagCategoryModel and reservation TagCategoryEntity
import { ReservationTagCategoryRepository } from "../repositories/reservation_tag_category-repo"; // Import the reservation TagCategoryRepository
import { Either, Right, Left } from "monet";

export interface DeleteReservationTagCategoryUsecase {
    execute: (reservationTagCategoryId: string) => Promise<Either<ErrorClass, void>>;
}

export class DeleteReservationTagCategory implements DeleteReservationTagCategoryUsecase {
    private readonly reservationTagCategoryRepository: ReservationTagCategoryRepository;

    constructor(reservationTagCategoryRepository: ReservationTagCategoryRepository) {
        this.reservationTagCategoryRepository = reservationTagCategoryRepository;
    }

    async execute(reservationTagCategoryId: string): Promise<Either<ErrorClass, void>> {
        return await this.reservationTagCategoryRepository.deleteReservationTagCategory(reservationTagCategoryId);
    }
}
