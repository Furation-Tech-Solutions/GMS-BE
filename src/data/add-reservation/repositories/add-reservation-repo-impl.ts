import { Either, Right, Left } from "monet";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { AddReservationRepository } from "@domain/add-reservation/repositories/add-reservation-repositories";
import { AddReservationDataSource } from "../datasources/add-reservation-data-source";
import {
  AddReservationEntity,
  AddReservationModel,
} from "@domain/add-reservation/entities/add-reservation";

import * as HttpStatus from "@presentation/error-handling/http-status";

export class AddReservationRepositoryImpl implements AddReservationRepository {
  private readonly addReservationDataSource: AddReservationDataSource;

  constructor(addReservationDataSource: AddReservationDataSource) {
    this.addReservationDataSource = addReservationDataSource;
  }

  async createAddReservation(
    addReservation: AddReservationModel
  ): Promise<Either<ErrorClass, AddReservationEntity>> {
    try {
      const createdAddReservation = await this.addReservationDataSource.create(
        addReservation
      );

      return Right<ErrorClass, AddReservationEntity>(createdAddReservation);
    } catch (error: any) { 
      if (error instanceof ApiError && error.status === 409) {
        console.log(error.name)
        return Left<ErrorClass, AddReservationEntity>(ApiError.reservationExits());
      }

        return Left<ErrorClass, AddReservationEntity>(ApiError.customError(HttpStatus.BAD_REQUEST, `${error.message}`));
      
    }
  }


  async deleteAddReservation(id: string): Promise<Either<ErrorClass, void>> {
    try {
      const result = await this.addReservationDataSource.delete(id);
      return Right<ErrorClass, void>(result);
    } catch (error: any) {
      if (error instanceof ApiError && error.name === "notfound") {
        return Left<ErrorClass, void>(ApiError.notFound());
      }
      return Left<ErrorClass, void>(ApiError.customError(HttpStatus.BAD_REQUEST, `${error.message}`));
    }
  }

  async updateAddReservation(
    id: string,
    data: AddReservationModel
  ): Promise<Either<ErrorClass, AddReservationEntity>> {
    try {
      const updatedAddReservation = await this.addReservationDataSource.update(
        id,
        data
      );
      return Right<ErrorClass, AddReservationEntity>(updatedAddReservation);
    } catch (error) {
      if (error instanceof ApiError && error.name === "conflict") {
        return Left<ErrorClass, AddReservationEntity>(ApiError.emailExist());
      }
      return Left<ErrorClass, AddReservationEntity>(ApiError.badRequest());
    }
  }

  async getAllAddReservation(): Promise<
    Either<ErrorClass, AddReservationEntity[]>
  > {
    try {
      const addReservation = await this.addReservationDataSource.getAll();
      return Right<ErrorClass, AddReservationEntity[]>(addReservation);
    } catch (error) {
      if (error instanceof ApiError && error.name === "notfound") {
        return Left<ErrorClass, AddReservationEntity[]>(ApiError.notFound());
      }
      return Left<ErrorClass, AddReservationEntity[]>(ApiError.badRequest());
    }
  }

  async getAddReservationById(
    id: string
  ): Promise<Either<ErrorClass, AddReservationEntity>> {
    try {
      const addReservation = await this.addReservationDataSource.read(id);
      return addReservation
        ? Right<ErrorClass, AddReservationEntity>(addReservation)
        : Left<ErrorClass, AddReservationEntity>(ApiError.notFound());
    } catch (error) {
      if (error instanceof ApiError && error.name === "notfound") {
        return Left<ErrorClass, AddReservationEntity>(ApiError.notFound());
      }
      return Left<ErrorClass, AddReservationEntity>(ApiError.badRequest());
    }
  }
}
