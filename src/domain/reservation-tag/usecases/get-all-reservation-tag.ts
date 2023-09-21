import { ErrorClass } from "@presentation/error-handling/api-error";
import { ReservationTagEntity, ReservationTagModel } from "../entities/reservation-tag-entities"; // Import the TagCategoryModel and TagCategoryEntity
import { ReservationTagRepository } from "../repositories/reservation-tag-repo"; // Import the TagCategoryRepository
import { Either, Right, Left } from "monet";

export interface GetAllReservationtagUsecase {
  execute: () => Promise<Either<ErrorClass, ReservationTagEntity[]>>;
}

export class GetAllReservationTag implements GetAllReservationtagUsecase {
  private readonly reservationTagRepository: ReservationTagRepository;

  constructor(reservationTagRepository: ReservationTagRepository) {
    this.reservationTagRepository = reservationTagRepository;
  }

  async execute(): Promise<Either<ErrorClass, ReservationTagEntity[]>> {
    return await this.reservationTagRepository.getAllReservationTag();
  }
}