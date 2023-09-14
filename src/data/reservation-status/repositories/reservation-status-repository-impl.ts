import { ReservationStatusRepository } from "@domain/reservation-status/repositories/reservation-status-repository";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { Either, Left, Right } from "monet";
import { ReservationStatusDataSource } from "../datasources/reservation-status-data-source";
import {
  ReservationStatusEntity,
  ReservationStatusModel,
} from "@domain/reservation-status/entities/reservation-status";

export class ReservationStatusRepositoryImpl
  implements ReservationStatusRepository
{
  private readonly dataSource: ReservationStatusDataSource;

  constructor(dataSource: ReservationStatusDataSource) {
    this.dataSource = dataSource;
  }

  async createReservationStatus(
    reservationStatus: ReservationStatusModel
  ): Promise<Either<ErrorClass, ReservationStatusEntity>> {
    try {
      let i = await this.dataSource.create(reservationStatus);
      return Right<ErrorClass, ReservationStatusEntity>(i);
    } catch (e) {
      if (typeof ApiError.emailExist) {
        return Left<ErrorClass, ReservationStatusEntity>(ApiError.emailExist());
      }
      return Left<ErrorClass, ReservationStatusEntity>(ApiError.badRequest());
    }
  }

  async getReservationStatusById(
    reservationStatusId: string
  ): Promise<Either<ErrorClass, ReservationStatusEntity>> {
    try {
      let i = await this.dataSource.getById(reservationStatusId);
      return Right<ErrorClass, ReservationStatusEntity>(i);
    } catch (e) {
      if (typeof e === typeof ApiError.notFound) {
        return Left<ErrorClass, ReservationStatusEntity>(ApiError.notFound());
      }
      return Left<ErrorClass, ReservationStatusEntity>(
        ApiError.internalError()
      );
    }
  }

  async getReservationStatus(): Promise<
    Either<ErrorClass, ReservationStatusEntity[]>
  > {
    try {
      const response = await this.dataSource.getAllReservationStauts();
      return Right<ErrorClass, ReservationStatusEntity[]>(response);
    } catch (error) {
      if (typeof error === typeof ApiError.notFound) {
        return Left<ErrorClass, ReservationStatusEntity[]>(ApiError.notFound());
      }
      return Left<ErrorClass, ReservationStatusEntity[]>(
        ApiError.internalError()
      );
    }
  }

  async updateReservationStatus(
    id: string,
    data: ReservationStatusModel
  ): Promise<Either<ErrorClass, ReservationStatusEntity>> {
    try {
      const response = await this.dataSource.update(id, data);
      return Right<ErrorClass, ReservationStatusEntity>(response);
    } catch (e) {
      if (typeof e === typeof ApiError.notFound) {
        return Left<ErrorClass, ReservationStatusEntity>(ApiError.notFound());
      }
      return Left<ErrorClass, ReservationStatusEntity>(ApiError.internalError());
    }
  }
  
  async deleteReservationStatus(id: string): Promise<Either<ErrorClass, void>> {
    try {
      const i = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(i);
    } catch (error) {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }
}
