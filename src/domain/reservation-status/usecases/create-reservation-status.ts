import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import {
  ReservationStatusEntity,
  ReservationStatusModel,
} from "../entities/reservation-status";
import { ReservationStatusRepository } from "../repositories/reservation-status-repository";

export interface CreateReservationStatusUsecase {
  execute: (
    reservationStatusData: ReservationStatusModel
  ) => Promise<Either<ErrorClass, ReservationStatusEntity>>;
}

export class CreateReservationStatus implements CreateReservationStatusUsecase {
  private readonly reservationStatusRepository: ReservationStatusRepository;

  constructor(reservationStatusRepository: ReservationStatusRepository) {
    this.reservationStatusRepository = reservationStatusRepository;
  }

  async execute(
    reservationStatusData: ReservationStatusModel
  ): Promise<Either<ErrorClass, ReservationStatusEntity>> {
    return await this.reservationStatusRepository.createReservationStatus(
      reservationStatusData
    );
  }
}
