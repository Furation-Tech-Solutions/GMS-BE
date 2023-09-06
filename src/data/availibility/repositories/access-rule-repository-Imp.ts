

import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { Either, Left, Right } from "monet";
import { ShiftDataSource } from "../datasource/shift-datasource";
import { ShiftEntity, ShiftModel } from "@domain/availibility/entities/shift-entity";
import { AccessRuleRepository } from "@domain/availibility/repositories/access-rule-repository";

export class AccessRuleRepositoryImpl implements AccessRuleRepository{
  private readonly dataSource: ShiftDataSource;

  constructor(dataSource: ShiftDataSource) {
    this.dataSource = dataSource;
  }

  async createShift(
    shift: ShiftModel
  ): Promise<Either<ErrorClass, ShiftEntity>> {
    try {
      let i = await this.dataSource.create(shift);
      
      return Right<ErrorClass, ShiftEntity>(i);
    } catch (error) {
      if (error instanceof ApiError && error.status === 409) {
        return Left<ErrorClass, ShiftEntity>(ApiError.overlappingShift());
      }
      return Left<ErrorClass, ShiftEntity>(ApiError.badRequest());
    }
  }


  async updateShift(
    id: string,
    shiftData: ShiftModel
  ): Promise<Either<ErrorClass, ShiftEntity>> {
    try {
      const response = await this.dataSource.update(id, shiftData);
      return Right<ErrorClass, ShiftEntity>(response);
    } catch (error) {
      return Left<ErrorClass, ShiftEntity>(ApiError.badRequest());
    }
  }



  async getShiftById(id: string ): Promise<Either<ErrorClass, ShiftEntity>> {
    try {
      let response = await this.dataSource.read(id);
      return Right<ErrorClass, ShiftEntity>(response);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        return Left<ErrorClass, ShiftEntity>(ApiError.notFound());
      }
      return Left<ErrorClass, ShiftEntity>(ApiError.badRequest());
    }
  }

async deleteShift(id: string): Promise<Either<ErrorClass, void>> {
    try {
      const res = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(res);
    } catch (error) {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }

    async getAllShifts(): Promise<Either<ErrorClass, ShiftEntity[]>> {
    try {
      const response = await this.dataSource.getAll();
      return Right<ErrorClass, ShiftEntity[]>(response);
    } catch (error) {
      if (error instanceof ApiError && error.status === 409) {
        return Left<ErrorClass, ShiftEntity[]>(ApiError.emailExist());
      }
      return Left<ErrorClass, ShiftEntity[]>(ApiError.badRequest());
    }
  }
}
