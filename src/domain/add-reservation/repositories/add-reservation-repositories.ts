import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
import {
  AddReservationEntity,
  AddReservationModel,
} from "../entities/add-reservation";

export interface AddReservationRepository {
  createAddReservation(
    addReservation: AddReservationModel
  ): Promise<Either<ErrorClass, AddReservationEntity>>;
  deleteAddReservation(id: string): Promise<Either<ErrorClass, void>>;
  getAddReservationById(
    id: string
  ): Promise<Either<ErrorClass, AddReservationEntity>>;
  updateAddReservation(
    id: string,
    data: AddReservationModel
  ): Promise<Either<ErrorClass, AddReservationEntity>>;
  getAllAddReservation(): Promise<Either<ErrorClass, AddReservationEntity[]>>;
}
