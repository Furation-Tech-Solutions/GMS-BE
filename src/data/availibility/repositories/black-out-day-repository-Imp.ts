
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { Either, Left, Right } from "monet";
import { BlackoutDayDataSource } from "../datasource/black-out-day-datasource";
import { BlackoutDayEntity, BlackoutDayModel } from "@domain/availibility/entities/black-out-day-entity";
import { BlackoutDayRepository } from "@domain/availibility/repositories/black-out-day-repository";



export class BlackoutDayRepositoryImpl implements BlackoutDayRepository {
  private readonly dataSource: BlackoutDayDataSource;

  constructor(dataSource: BlackoutDayDataSource) {
    this.dataSource = dataSource;
  }

  async createBlackoutDay(
    blackoutDayData: BlackoutDayModel
  ): Promise<Either<ErrorClass, BlackoutDayEntity>> {
    try {
      let newBlackoutDay = await this.dataSource.create(blackoutDayData);
      
      return Right<ErrorClass, BlackoutDayEntity>(newBlackoutDay);
    } catch (error) {
      if (error instanceof ApiError && error.status === 409) {
        return Left<ErrorClass, BlackoutDayEntity>(ApiError.overlappingBlackoutDate());
      }
      return Left<ErrorClass, BlackoutDayEntity>(ApiError.badRequest());
    }
  }


  async updateBlackoutDay(
    id: string,
    blackoutDayData: BlackoutDayModel
  ): Promise<Either<ErrorClass, BlackoutDayEntity>> {
    try {
      const newBlackoutDay = await this.dataSource.update(id, blackoutDayData);
      return Right<ErrorClass, BlackoutDayEntity>(newBlackoutDay);
    } catch (error) {
      return Left<ErrorClass, BlackoutDayEntity>(ApiError.badRequest());
    }
  }



  async getBlackoutDayById(id: string ): Promise<Either<ErrorClass, BlackoutDayEntity>> {
    try {
      let blackoutDay = await this.dataSource.read(id);
      return Right<ErrorClass, BlackoutDayEntity>(blackoutDay);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        return Left<ErrorClass, BlackoutDayEntity>(ApiError.notFound());
      }
      return Left<ErrorClass, BlackoutDayEntity>(ApiError.badRequest());
    }
  }

async deleteBlackoutDay(id: string): Promise<Either<ErrorClass, void>> {
    try {
      const blackoutDay = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(blackoutDay);
    } catch (error) {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }

    async getAllBlackoutDay(): Promise<Either<ErrorClass, BlackoutDayEntity[]>> {
    try {
      const blackoutDay = await this.dataSource.getAll();
      return Right<ErrorClass, BlackoutDayEntity[]>(blackoutDay);
    } catch (error) {
      if (error instanceof ApiError && error.status === 409) {
        return Left<ErrorClass, BlackoutDayEntity[]>(ApiError.emailExist());
      }
      return Left<ErrorClass, BlackoutDayEntity[]>(ApiError.badRequest());
    }
  }
}
