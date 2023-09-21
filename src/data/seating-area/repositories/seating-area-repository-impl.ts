import { SeatingAreaRepository } from "@domain/seating-area/repositories/seating-area-repository";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { Either, Left, Right } from "monet";
import { SeatingAreaDataSource } from "../datasources/seating-area-data-source";
import {
  SeatingAreaEntity,
  SeatingAreaModel,
} from "@domain/seating-area/entities/seating-area";

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

      if (typeof ApiError.emailExist) {
        return Left<ErrorClass, SeatingAreaEntity>(ApiError.emailExist());
      }

      return Left<ErrorClass, SeatingAreaEntity>(ApiError.badRequest());
    }
  }

  async getSeatingAreaById(
    seatingAreaId: string
  ): Promise<Either<ErrorClass, SeatingAreaEntity>> {
    try {
      let i = await this.dataSource.getById(seatingAreaId);
      return Right<ErrorClass, SeatingAreaEntity>(i);
    } catch (e) {
      if (typeof e === typeof ApiError.notFound) {
        return Left<ErrorClass, SeatingAreaEntity>(ApiError.notFound());
      }
      return Left<ErrorClass, SeatingAreaEntity>(ApiError.internalError());
    }
  }

  async getSeatingAreas(): Promise<Either<ErrorClass, SeatingAreaEntity[]>> {
    try {
      const response = await this.dataSource.getAllSeatingAreas();
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
    } catch (e) {
      if (typeof e === typeof ApiError.notFound) {
        return Left<ErrorClass, SeatingAreaEntity>(ApiError.notFound());
      }
      return Left<ErrorClass, SeatingAreaEntity>(ApiError.internalError());
    }
  }

  async deleteSeatingArea(id: string): Promise<Either<ErrorClass, void>> {
    try {
      const i = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(i);
    } catch (error) {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }
}
