
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { Either, Left, Right } from "monet";
import { CheckInCheckOutDataSource } from "../datasource/check-in-out-datasource";
import { CheckInCheckOutEntity, CheckInCheckOutModel } from "@domain/client-management/entities/check-in-out-entities";
import { CheckInCheckOutRepository } from "@domain/client-management/repositories/check-in-out-repository";
import * as HttpStatus from "@presentation/error-handling/http-status";
export class CheckInCheckOutRepositoryImpl implements CheckInCheckOutRepository {
  private readonly dataSource: CheckInCheckOutDataSource;

  constructor(dataSource: CheckInCheckOutDataSource) {
    this.dataSource = dataSource;
  }

  async createCheckOut(
    checkInCheckOut: string
  ): Promise<Either<ErrorClass, CheckInCheckOutEntity>> {
    try {
      let newCheck = await this.dataSource.create(checkInCheckOut);
      
      return Right<ErrorClass, CheckInCheckOutEntity>(newCheck);
    } catch (error: any) {
      if (error instanceof ApiError) {
        return Left<ErrorClass, CheckInCheckOutEntity>(ApiError.userNotFound());
      }
      return Left<ErrorClass, CheckInCheckOutEntity>(ApiError.customError(HttpStatus.BAD_REQUEST, error.message));
    }
  }

  async deleteCheckOut(id: string): Promise<Either<ErrorClass, void>> {
    try {
      const res = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(res);
    } catch (error) {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }

  async updateCheckOut(
    id: string,
    data: CheckInCheckOutModel,
  ): Promise<Either<ErrorClass, CheckInCheckOutEntity>> {
    try {
      const response = await this.dataSource.update(id, data);
      return Right<ErrorClass, CheckInCheckOutEntity>(response);
    } catch (error:any) {
      if(error instanceof ApiError) {
        return Left<ErrorClass, CheckInCheckOutEntity>(ApiError.notFound());
      }
      return Left<ErrorClass, CheckInCheckOutEntity>(ApiError.customError(HttpStatus.BAD_REQUEST, error.message));
    }
  }

  async getAllCheckOut(): Promise<Either<ErrorClass, CheckInCheckOutEntity[]>> {
    try {
      const response = await this.dataSource.getAllAdmins();
      return Right<ErrorClass, CheckInCheckOutEntity[]>(response);
    } catch (error) {
      if (error instanceof ApiError && error.status === 409) {
        return Left<ErrorClass, CheckInCheckOutEntity[]>(ApiError.emailExist());
      }
      return Left<ErrorClass, CheckInCheckOutEntity[]>(ApiError.badRequest());
    }
  }

  async getCheckOutById(id: string): Promise<Either<ErrorClass, CheckInCheckOutEntity>> {
    try {
      let response = await this.dataSource.read(id);
      return Right<ErrorClass, CheckInCheckOutEntity>(response);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        return Left<ErrorClass, CheckInCheckOutEntity>(ApiError.notFound());
      }
      return Left<ErrorClass, CheckInCheckOutEntity>(ApiError.badRequest());
    }
  }
}
