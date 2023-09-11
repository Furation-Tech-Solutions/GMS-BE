import { OutletModel, OutletEntity } from "@domain/outlet/entities/outlet";
import { OutletRepository } from "@domain/outlet/repositories/outlet-repository";
import { OutletDataSource } from "@data/outlet/datasources/outlet-data-source";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { Either, Left, Right } from "monet";

export class OutletRepositoryImpl implements OutletRepository {
  private readonly dataSource: OutletDataSource;

  constructor(dataSource: OutletDataSource) {
    this.dataSource = dataSource;
  }

  async createOutlet(
    outlet: OutletModel
  ): Promise<Either<ErrorClass, OutletEntity>> {
    try {
      let i = await this.dataSource.create(outlet);
      return Right<ErrorClass, OutletEntity>(i);
    } catch (e) {
      if (typeof ApiError.emailExist) {
        return Left<ErrorClass, OutletEntity>(ApiError.emailExist());
      }
      return Left<ErrorClass, OutletEntity>(ApiError.badRequest());
    }
  }

  async getOutletById(
    outletId: string
  ): Promise<Either<ErrorClass, OutletEntity>> {
    try {
      let i = await this.dataSource.getById(outletId);
      return Right<ErrorClass, OutletEntity>(i);
    } catch (e) {
      if (typeof e === typeof ApiError.notFound) {
        return Left<ErrorClass, OutletEntity>(ApiError.notFound());
      }
      return Left<ErrorClass, OutletEntity>(ApiError.internalError());
    }
  }
  async getOutlets(): Promise<Either<ErrorClass, OutletEntity[]>> {
    try {
      const response = await this.dataSource.getAllOutlets();
      return Right<ErrorClass, OutletEntity[]>(response);
    } catch (error) {
      if (typeof error === typeof ApiError.notFound) {
        return Left<ErrorClass, OutletEntity[]>(ApiError.notFound());
      }
      return Left<ErrorClass, OutletEntity[]>(ApiError.internalError());
    }
  }
  async updateOutlet(
    id: string,
    data: OutletModel
  ): Promise<Either<ErrorClass, OutletEntity>> {
    try {
      const response = await this.dataSource.update(id, data);
      return Right<ErrorClass, OutletEntity>(response);
    } catch (e) {
      if (typeof e === typeof ApiError.notFound) {
        return Left<ErrorClass, OutletEntity>(ApiError.notFound());
      }
      return Left<ErrorClass, OutletEntity>(ApiError.internalError());
    }   
  }
  async deleteOutlet(id: string): Promise<Either<ErrorClass, void>> {
    try {
      const i = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(i);
    } catch (error) {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }

  async suspendOutlet(id: string): Promise<Either<ErrorClass, void>> {
    try {
      const i = await this.dataSource.suspend(id);
      return Right<ErrorClass, void>(i);
    } catch (error) {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }

  async reactivateOutlet(id: string): Promise<Either<ErrorClass, any>> {
    try {
      const i = await this.dataSource.reactivate(id);
      return Right<ErrorClass, void>(i);
    } catch (error) {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }
}
