import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import {
  ReservationStatusEntity,
  ReservationStatusModel,
} from "../entities/reservation-status";
import { ReservationStatusRepository } from "../repositories/reservation-status-repository";
export interface UpdateReservationStatusUsecase {
  execute: (
    reservationStatusId: string,
    reservationStatusData: ReservationStatusModel
  ) => Promise<Either<ErrorClass, ReservationStatusEntity>>;
}

export class UpdateReservationStatus implements UpdateReservationStatusUsecase {
  private readonly reservationStatusRepository: ReservationStatusRepository;

  constructor(reservationStatusRepository: ReservationStatusRepository) {
    this.reservationStatusRepository = reservationStatusRepository;
  }

  async execute(
    reservationStatusId: string,
    reservationStatusData: ReservationStatusModel
  ): Promise<Either<ErrorClass, ReservationStatusEntity>> {
    return await this.reservationStatusRepository.updateReservationStatus(
      reservationStatusId,
      reservationStatusData
    );
  }
}
