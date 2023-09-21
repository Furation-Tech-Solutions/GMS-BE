import { ErrorClass } from "@presentation/error-handling/api-error";
import { ReservationTagCategoryEntity, ReservationTagCategoryModel } from "../entities/reservation_tag_category_entities"; // Import the reservation TagCategoryModel and reservation TagCategoryEntity
import { ReservationTagCategoryRepository } from "../repositories/reservation_tag_category-repo"; // Import the reservation TagCategoryRepository
import { Either, Right, Left } from "monet";

export interface GetAllReservationtagCategoriesUsecase {
  execute: () => Promise<Either<ErrorClass, ReservationTagCategoryEntity[]>>;
}

export class GetAllReservationTagCategories implements GetAllReservationtagCategoriesUsecase {
  private readonly reservationTagCategoryRepository: ReservationTagCategoryRepository;

  constructor(reservationTagCategoryRepository: ReservationTagCategoryRepository) {
    this.reservationTagCategoryRepository = reservationTagCategoryRepository;
  }

  async execute(): Promise<Either<ErrorClass, ReservationTagCategoryEntity[]>> {
    return await this.reservationTagCategoryRepository.getAllReservationTagCategories();
  }
}
