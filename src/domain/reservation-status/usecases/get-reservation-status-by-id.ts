import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { ReservationStatusEntity } from "../entities/reservation-status";
import { ReservationStatusRepository } from "../repositories/reservation-status-repository";

export interface GetReservationStatusByIdUsecase {
  execute: (
    reservationStatusData: string
  ) => Promise<Either<ErrorClass, ReservationStatusEntity>>;
}

export class GetReservationStatusById
  implements GetReservationStatusByIdUsecase
{
  private readonly reservationStatusRepository: ReservationStatusRepository;

  constructor(reservationStatusRepository: ReservationStatusRepository) {
    this.reservationStatusRepository = reservationStatusRepository;
  }

  async execute(
    reservationStatusId: string
  ): Promise<Either<ErrorClass, ReservationStatusEntity>> {
    return await this.reservationStatusRepository.getReservationStatusById(
      reservationStatusId
    );
  }
}
