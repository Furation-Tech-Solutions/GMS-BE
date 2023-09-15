import { ErrorClass } from "@presentation/error-handling/api-error";
import { ReservationTagEntity, ReservationTagModel } from "../entities/reservation-tag-entities"; // Import the TagCategoryModel and TagCategoryEntity
import { ReservationTagRepository } from "../repositories/reservation-tag-repo"; // Import the TagCategoryRepository
import { Either, Right, Left } from "monet";

export interface UpdateReservationTagUsecase {
  execute: (
    tagId: string,
    tagData: ReservationTagEntity
  ) => Promise<Either<ErrorClass, ReservationTagEntity>>;
}

export class UpdateReservationTag implements UpdateReservationTagUsecase {
  private readonly reservationTagRepository: ReservationTagRepository;

  constructor(reservationTagRepository: ReservationTagRepository) {
    this.reservationTagRepository = reservationTagRepository;
  }

  async execute(
    TagId: string,
    Data: ReservationTagEntity
  ): Promise<Either<ErrorClass, ReservationTagEntity>> {
    return await this.reservationTagRepository.updateReservationTag(TagId, Data);
  }
}