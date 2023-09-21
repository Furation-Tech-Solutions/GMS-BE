import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
import {
  ReservationStatusEntity,
  ReservationStatusModel,
} from "../entities/reservation-status";

export interface ReservationStatusRepository {
  createReservationStatus(
    reservationStatus: ReservationStatusModel
  ): Promise<Either<ErrorClass, ReservationStatusEntity>>;
  getReservationStatusById(
    id: string
  ): Promise<Either<ErrorClass, ReservationStatusEntity>>;
  getReservationStatus(): Promise<
    Either<ErrorClass, ReservationStatusEntity[]>
  >;
  updateReservationStatus(
    id: string,
    reservationStatus: ReservationStatusModel
  ): Promise<Either<ErrorClass, ReservationStatusEntity>>;
  deleteReservationStatus(id: string): Promise<Either<ErrorClass, void>>;
}
