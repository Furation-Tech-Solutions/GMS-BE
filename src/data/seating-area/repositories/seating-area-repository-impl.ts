import { SeatingAreaRepository } from "@domain/seating-area/repositories/seating-area-repository";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { Either, Left, Right } from "monet";
import { SeatingAreaDataSource } from "../datasources/seating-area-data-source";
import {
  SeatingAreaEntity,
  SeatingAreaModel,
} from "@domain/seating-area/entities/seating-area";
import mongoose from "mongoose";
import * as HttpStatus from "@presentation/error-handling/http-status";

export class SeatingAreaRepositoryImpl implements SeatingAreaRepository {
  private readonly dataSource: SeatingAreaDataSource;

  constructor(dataSource: SeatingAreaDataSource) {
    this.dataSource = dataSource;
  }

  async createSeatingArea(
    seatingArea: SeatingAreaModel
  ): Promise<Either<ErrorClass, SeatingAreaEntity>> {
    try {
      let i = await this.dataSource.create(seatingArea);

      return Right<ErrorClass, SeatingAreaEntity>(i);
    } catch (e) {
      if (e instanceof ApiError && e.status === 409) {
        return Left<ErrorClass, SeatingAreaEntity>(
          ApiError.customError(HttpStatus.CONFLICT, e.message)
        );
      }
      // if (typeof ApiError.dataExists) {
      //   return Left<ErrorClass, SeatingAreaEntity>(ApiError.dataExists());
      // }

      return Left<ErrorClass, SeatingAreaEntity>(ApiError.badRequest());
    }
  }

  async getSeatingAreaById(
    seatingAreaId: string
  ): Promise<Either<ErrorClass, SeatingAreaEntity>> {
    try {
      let i = await this.dataSource.getById(seatingAreaId);
      return Right<ErrorClass, SeatingAreaEntity>(i);
    } catch (e: any) {
      if (e instanceof mongoose.Error.CastError || e.name == "notfound") {
        return Left<ErrorClass, SeatingAreaEntity>(
          e.name == "notfound" ? ApiError.notFound() : ApiError.castError()
        );
      }
      return Left<ErrorClass, SeatingAreaEntity>(ApiError.internalError());
    }
  }

  async getSeatingAreas(outletId:string): Promise<Either<ErrorClass, SeatingAreaEntity[]>> {
    try {
      const response = await this.dataSource.getAllSeatingAreas(outletId);
      return Right<ErrorClass, SeatingAreaEntity[]>(response);
    } catch (error) {
      if (typeof error === typeof ApiError.notFound) {
        return Left<ErrorClass, SeatingAreaEntity[]>(ApiError.notFound());
      }
      return Left<ErrorClass, SeatingAreaEntity[]>(ApiError.internalError());
    }
  }

  async updateSeatingArea(
    id: string,
    data: SeatingAreaModel
  ): Promise<Either<ErrorClass, SeatingAreaEntity>> {
    try {
      const response = await this.dataSource.update(id, data);
      return Right<ErrorClass, SeatingAreaEntity>(response);
    } catch (e: any) {
      // if (typeof e === typeof ApiError.notFound) {
      //   return Left<ErrorClass, SeatingAreaEntity>(ApiError.notFound());
      // }
      if (e instanceof mongoose.Error.CastError || e.name == "notfound") {
        return Left<ErrorClass, SeatingAreaEntity>(
          e.name == "notfound" ? ApiError.notFound() : ApiError.castError()
        );
      }
      return Left<ErrorClass, SeatingAreaEntity>(ApiError.internalError());
    }
  }

  async deleteSeatingArea(id: string): Promise<Either<ErrorClass, void>> {
    try {
      const i = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(i);
    } catch (error) {
      // if (e instanceof mongoose.Error.CastError || e.name == "notfound") {
      //   return Left<ErrorClass, SeatingAreaEntity>(
      //     e.name == "notfound" ? ApiError.notFound() : ApiError.castError()
      //   );
      // }
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }
}
