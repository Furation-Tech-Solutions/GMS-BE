import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { Either, Left, Right } from "monet";
import { TableDataSource } from "../datasources/table-data-source";
import { TableRepository } from "@domain/table/repositories/table-repository";
import { TableEntity, TableModel } from "@domain/table/entities/table";

export class TableRepositoryImpl implements TableRepository {
  private readonly dataSource: TableDataSource;

  constructor(dataSource: TableDataSource) {
    this.dataSource = dataSource;
  }

  async createTable(
    table: TableModel
  ): Promise<Either<ErrorClass, TableEntity>> {
    try {
      let i = await this.dataSource.create(table);
      return Right<ErrorClass, TableEntity>(i);
    } catch (e) {
      if (typeof ApiError.emailExist) {
        return Left<ErrorClass, TableEntity>(ApiError.emailExist());
      }
      return Left<ErrorClass, TableEntity>(ApiError.badRequest());
    }
  }

  async getTableById(
    tableId: string
  ): Promise<Either<ErrorClass, TableEntity>> {
    try {
      let i = await this.dataSource.getById(tableId);
      return Right<ErrorClass, TableEntity>(i);
    } catch (e) {
      if (typeof e === typeof ApiError.notFound) {
        return Left<ErrorClass, TableEntity>(ApiError.notFound());
      }
      return Left<ErrorClass, TableEntity>(ApiError.internalError());
    }
  }

  async getTables(): Promise<Either<ErrorClass, TableEntity[]>> {
    try {
      const response = await this.dataSource.getAllTables();
      return Right<ErrorClass, TableEntity[]>(response);
    } catch (error) {
      if (typeof error === typeof ApiError.notFound) {
        return Left<ErrorClass, TableEntity[]>(ApiError.notFound());
      }
      return Left<ErrorClass, TableEntity[]>(ApiError.internalError());
    }
  }

  async updateTable(
    id: string,
    data: TableModel
  ): Promise<Either<ErrorClass, TableEntity>> {
    try {
      const response = await this.dataSource.update(id, data);
      return Right<ErrorClass, TableEntity>(response);
    } catch (e) {
      if (typeof e === typeof ApiError.notFound) {
        return Left<ErrorClass, TableEntity>(ApiError.notFound());
      }
      return Left<ErrorClass, TableEntity>(ApiError.internalError());
    }
  }

  async deleteTable(id: string): Promise<Either<ErrorClass, void>> {
    try {
      const i = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(i);
    } catch (error) {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }
}
