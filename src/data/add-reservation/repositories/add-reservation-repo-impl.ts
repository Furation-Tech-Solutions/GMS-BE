import { Either, Right, Left } from "monet";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { AddReservationRepository } from "@domain/add-reservation/repositories/add-reservation-repositories";
import { AddReservationDataSource } from "../datasources/add-reservation-data-source";
import {
  AddReservationEntity,
  AddReservationModel,
} from "@domain/add-reservation/entities/add-reservation";

import * as HttpStatus from "@presentation/error-handling/http-status";
import mongoose from "mongoose";
import { IRFilter } from "types/add-reservation-filter.ts/filter-type";

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
      
      console.log(error.message, "error.message");

      if (error instanceof ApiError) {
        return Left<ErrorClass, AddReservationEntity>(
          ApiError.reservationExits()
        );
      }
      return Left<ErrorClass, AddReservationEntity>(
    
        
        ApiError.customError(HttpStatus.BAD_REQUEST, error.message)
      );
    }
  }

  async deleteAddReservation(id: string): Promise<Either<ErrorClass, void>> {
    try {
      const result = await this.addReservationDataSource.delete(id);
      return Right<ErrorClass, void>(result);
    } catch (error: any) {
      if (
        error instanceof mongoose.Error.CastError ||
        error.name == "notfound"
      ) {
        return Left<ErrorClass, void>(
          error.name == "notfound" ? ApiError.notFound() : ApiError.castError()
        );
      }
      return Left<ErrorClass, void>(
        ApiError.customError(HttpStatus.BAD_REQUEST, `${error.message}`)
      );
    }
  }

  async updateAddReservation(
    id: string,
    data: AddReservationModel
  ): Promise<Either<ErrorClass, AddReservationEntity>> {
    try {
      const newData = {
        ...data,
        reservationStatus: data.reservationStatus.toLowerCase(),
      };
      const updatedAddReservation = await this.addReservationDataSource.update(
        id,
        newData
      );
      return Right<ErrorClass, AddReservationEntity>(updatedAddReservation);
    } catch (error) {
      console.log(error);
      if (error instanceof mongoose.Error.CastError) {
        return Left<ErrorClass, AddReservationEntity>(ApiError.castError());
      }
      if (error instanceof ApiError) {
        return Left<ErrorClass, AddReservationEntity>(
          ApiError.customError(error.status, error.message)
        );
      }
      return Left<ErrorClass, AddReservationEntity>(ApiError.badRequest());
    }
  }

  async getAllAddReservation(
    filter: IRFilter
  ): Promise<Either<ErrorClass, AddReservationEntity[]>> {
    try {
      const addReservation = await this.addReservationDataSource.getAll(filter);
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
      return Right<ErrorClass, AddReservationEntity>(addReservation);
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        return Left<ErrorClass, AddReservationEntity>(ApiError.castError());
      }
      return Left<ErrorClass, AddReservationEntity>(ApiError.badRequest());
    }
  }

  async tableBlockCheck(
    id: string,
    reservationDetail: AddReservationEntity
  ): Promise<Either<ErrorClass, AddReservationEntity[]>> {
    try {
      const result = await this.addReservationDataSource.checkTableAvability(
        id,
        reservationDetail
      );
      return Right<ErrorClass, AddReservationEntity[]>(result);
    } catch (error: any) {
      console.log("reservation datatsource===>", { error: error });
      if (
        error instanceof mongoose.Error.CastError ||
        error.name == "notfound"
      ) {
        return Left<ErrorClass, AddReservationEntity[]>(
          error.name == "notfound" ? ApiError.notFound() : ApiError.castError()
        );
      }
      return Left<ErrorClass, AddReservationEntity[]>(
        ApiError.customError(HttpStatus.BAD_REQUEST, `${error.message}`)
      );
    }
  }
}
