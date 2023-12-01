// Importing necessary dependencies and modules
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

// Class definition for the implementation of AddReservationRepository
export class AddReservationRepositoryImpl implements AddReservationRepository {
  // Private property for the data source handling reservations
  private readonly addReservationDataSource: AddReservationDataSource;

  // Constructor initializing the repository with a data source
  constructor(addReservationDataSource: AddReservationDataSource) {
    this.addReservationDataSource = addReservationDataSource;
  }

  // Method to create a new reservation
  async createAddReservation(
    addReservation: AddReservationModel
  ): Promise<Either<ErrorClass, AddReservationEntity>> {
    try {
      // Attempting to create a reservation via the data source
      const createdAddReservation = await this.addReservationDataSource.create(
        addReservation
      );

      // Returning a success Right with the created reservation entity
      return Right<ErrorClass, AddReservationEntity>(createdAddReservation);
    } catch (error: any) {
      // Handling errors during reservation creation
      if (error instanceof ApiError) {
        // Returning a Left with a specific error if it's an API error
        return Left<ErrorClass, AddReservationEntity>(
          ApiError.reservationExits()
        );
      }
      // Returning a Left with a custom error for other exceptions
      return Left<ErrorClass, AddReservationEntity>(
        ApiError.customError(HttpStatus.BAD_REQUEST, error.message)
      );
    }
  }

  // Method to delete a reservation by ID
  async deleteAddReservation(id: string): Promise<Either<ErrorClass, void>> {
    try {
      // Attempting to delete a reservation via the data source
      const result = await this.addReservationDataSource.delete(id);
      // Returning a success Right with the deletion result
      return Right<ErrorClass, void>(result);
    } catch (error: any) {
      // Handling errors during reservation deletion
      if (
        error instanceof mongoose.Error.CastError ||
        error.name == "notfound"
      ) {
        // Returning specific errors based on error type
        return Left<ErrorClass, void>(
          error.name == "notfound" ? ApiError.notFound() : ApiError.castError()
        );
      }
      // Returning a custom error for other exceptions
      return Left<ErrorClass, void>(
        ApiError.customError(HttpStatus.BAD_REQUEST, `${error.message}`)
      );
    }
  }

  // Method to update a reservation by ID with new data
  async updateAddReservation(
    id: string,
    data: AddReservationModel
  ): Promise<Either<ErrorClass, AddReservationEntity>> {
    try {
      // Modifying reservation data before updating
      const newData = {
        ...data,
        reservationStatus: data.reservationStatus.toLowerCase(),
      };

      // Attempting to update a reservation via the data source
      const updatedAddReservation = await this.addReservationDataSource.update(
        id,
        newData
      );

      // Returning a success Right with the updated reservation entity
      return Right<ErrorClass, AddReservationEntity>(updatedAddReservation);
    } catch (error) {
      // Handling errors during reservation update
      if (error instanceof mongoose.Error.CastError) {
        // Returning a Left with a specific error for casting issues
        return Left<ErrorClass, AddReservationEntity>(ApiError.castError());
      }
      if (error instanceof ApiError) {
        // Returning a Left with a specific API error
        return Left<ErrorClass, AddReservationEntity>(
          ApiError.customError(error.status, error.message)
        );
      }
      // Returning a generic custom error for other exceptions
      return Left<ErrorClass, AddReservationEntity>(ApiError.badRequest());
    }
  }

  // Method to retrieve all reservations with filtering options
  async getAllAddReservation(
    filter: IRFilter
  ): Promise<Either<ErrorClass, AddReservationEntity[]>> {
    try {
      // Attempting to fetch reservations via the data source
      const addReservation = await this.addReservationDataSource.getAll(filter);
      // Returning a success Right with the fetched reservations
      return Right<ErrorClass, AddReservationEntity[]>(addReservation);
    } catch (error) {
      // Handling errors during fetching of reservations
      if (error instanceof ApiError && error.name === "notfound") {
        // Returning a Left with a specific API error for 'not found'
        return Left<ErrorClass, AddReservationEntity[]>(ApiError.notFound());
      }
      // Returning a generic custom error for other exceptions
      return Left<ErrorClass, AddReservationEntity[]>(ApiError.badRequest());
    }
  }

  // Method to retrieve a reservation by ID
  async getAddReservationById(
    id: string
  ): Promise<Either<ErrorClass, AddReservationEntity>> {
    try {
      // Attempting to fetch a reservation by ID via the data source
      const addReservation = await this.addReservationDataSource.read(id);
      // Returning a success Right with the fetched reservation entity
      return Right<ErrorClass, AddReservationEntity>(addReservation);
    } catch (error) {
      // Handling errors during fetching a reservation by ID
      if (error instanceof mongoose.Error.CastError) {
        // Returning a Left with a specific error for casting issues
        return Left<ErrorClass, AddReservationEntity>(ApiError.castError());
      }
      // Returning a generic custom error for other exceptions
      return Left<ErrorClass, AddReservationEntity>(ApiError.badRequest());
    }
  }

  // Method to check table availability for a reservation
  async tableBlockCheck(
    id: string,
    reservationDetail: AddReservationEntity
  ): Promise<Either<ErrorClass, AddReservationEntity[]>> {
    try {
      // Attempting to check table availability via the data source
      const result = await this.addReservationDataSource.checkTableAvability(
        id,
        reservationDetail
      );
      // Returning a success Right with the table availability check result
      return Right<ErrorClass, AddReservationEntity[]>(result);
    } catch (error: any) {
      // Handling errors during table availability check
      if (
        error instanceof mongoose.Error.CastError ||
        error.name == "notfound"
      ) {
        // Returning specific errors based on the error type
        return Left<ErrorClass, AddReservationEntity[]>(
          error.name == "notfound" ? ApiError.notFound() : ApiError.castError()
        );
      }
      // Returning a generic custom error for other exceptions
      return Left<ErrorClass, AddReservationEntity[]>(
        ApiError.customError(HttpStatus.BAD_REQUEST, `${error.message}`)
      );
    }
  }
}
