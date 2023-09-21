import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { ReservationStatusRepository } from "../repositories/reservation-status-repository";

export interface DeleteReservationStatusUsecase {
  execute: (reservationStatusId: string) => Promise<Either<ErrorClass, void>>;
}
export class DeleteReservationStatus implements DeleteReservationStatusUsecase {
  private readonly reservationStatusRepository: ReservationStatusRepository;
  constructor(reservationStatusRepository: ReservationStatusRepository) {
    this.reservationStatusRepository = reservationStatusRepository;
  }
  async execute(
    reservationStatusId: string
  ): Promise<Either<ErrorClass, void>> {
    return await this.reservationStatusRepository.deleteReservationStatus(
      reservationStatusId
    );
  }
}
