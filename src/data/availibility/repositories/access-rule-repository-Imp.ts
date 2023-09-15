

import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { Either, Left, Right } from "monet";
import { AccessRuleRepository } from "@domain/availibility/repositories/access-rule-repository";
import { AccessRuleDataSource } from "../datasource/access-rule-datasource";
import { AccessRuleEntity, AccessRuleModel } from "@domain/availibility/entities/access-rule-entity";

export class AccessRuleRepositoryImpl implements AccessRuleRepository{
  private readonly dataSource: AccessRuleDataSource;

  constructor(dataSource: AccessRuleDataSource) {
    this.dataSource = dataSource;
  }

  async createAccessRule(
    accessRule: AccessRuleModel
  ): Promise<Either<ErrorClass, AccessRuleEntity>> {
    try {
      let accessRuleData = await this.dataSource.create(accessRule);
      
      return Right<ErrorClass, AccessRuleEntity>(accessRuleData);
    } catch (error) {
      if (error instanceof ApiError && error.status === 409) {
        return Left<ErrorClass, AccessRuleEntity>(ApiError.overlappingShift());
      }
      return Left<ErrorClass, AccessRuleEntity>(ApiError.badRequest());
    }
  }


  async updateAccessRule(
    id: string,
    accessRuleData: AccessRuleModel
  ): Promise<Either<ErrorClass, AccessRuleEntity>> {
    try {
      const response = await this.dataSource.update(id, accessRuleData);
      return Right<ErrorClass, AccessRuleEntity>(response);
    } catch (error) {
      return Left<ErrorClass, AccessRuleEntity>(ApiError.badRequest());
    }
  }



  async getAccessRuleById(id: string ): Promise<Either<ErrorClass, AccessRuleEntity>> {
    try {
      let response = await this.dataSource.read(id);
      return Right<ErrorClass, AccessRuleEntity>(response);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        return Left<ErrorClass, AccessRuleEntity>(ApiError.notFound());
      }
      return Left<ErrorClass, AccessRuleEntity>(ApiError.badRequest());
    }
  }

async deleteAccessRule(id: string): Promise<Either<ErrorClass, void>> {
    try {
      const res = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(res);
    } catch (error) {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }

    async getAllAccessRule(): Promise<Either<ErrorClass, AccessRuleEntity[]>> {
    try {
      const response = await this.dataSource.getAll();
      return Right<ErrorClass, AccessRuleEntity[]>(response);
    } catch (error) {
      if (error instanceof ApiError && error.status === 409) {
        return Left<ErrorClass, AccessRuleEntity[]>(ApiError.emailExist());
      }
      return Left<ErrorClass, AccessRuleEntity[]>(ApiError.badRequest());
    }
  }
}
