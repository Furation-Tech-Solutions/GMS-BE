import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
import {
  AddReservationEntity,
  AddReservationModel,
} from "../entities/add-reservation";
import { IRFilter } from "types/add-reservation-filter.ts/filter-type";

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
  getAllAddReservation(
    filter: IRFilter
  ): Promise<Either<ErrorClass, AddReservationEntity[]>>;
}
