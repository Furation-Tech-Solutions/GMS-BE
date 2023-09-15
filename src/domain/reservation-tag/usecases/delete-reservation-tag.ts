import { ErrorClass } from "@presentation/error-handling/api-error";
import { ReservationTagEntity, ReservationTagModel } from "../entities/reservation-tag-entities"; // Import the TagCategoryModel and TagCategoryEntity
import { ReservationTagRepository } from "../repositories/reservation-tag-repo"; // Import the TagCategoryRepository
import { Either, Right, Left } from "monet";
export interface DeleteReservationTagUsecase {
    execute: (clientTagId: string) => Promise<Either<ErrorClass, void>>;
}

export class DeleteReservationTag implements DeleteReservationTagUsecase {
    private readonly reservationTagRepository: ReservationTagRepository;

    constructor(reservationTagRepository: ReservationTagRepository) {
        this.reservationTagRepository = reservationTagRepository;
    }

    async execute(TagId: string): Promise<Either<ErrorClass, void>> {
        return await this.reservationTagRepository.deleteReservationTag(TagId);
    }
}