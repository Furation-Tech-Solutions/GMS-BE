import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { ReservationStatusEntity } from "../entities/reservation-status";
import { ReservationStatusRepository } from "../repositories/reservation-status-repository";

export interface GetAllReservationStatusUsecase {
  execute: () => Promise<Either<ErrorClass, ReservationStatusEntity[]>>;
}

export class GetAllReservationStatus implements GetAllReservationStatusUsecase {
  private readonly reservationStatusRepository: ReservationStatusRepository;

  constructor(reservationStatusRepository: ReservationStatusRepository) {
    this.reservationStatusRepository = reservationStatusRepository;
  }

  async execute(): Promise<Either<ErrorClass, ReservationStatusEntity[]>> {
    return await this.reservationStatusRepository.getReservationStatus();
  }
}
