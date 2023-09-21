import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { TableEntity, TableModel } from "../entities/table";

export interface TableRepository {
  createTable(table: TableModel): Promise<Either<ErrorClass, TableEntity>>;
  getTableById(id: string): Promise<Either<ErrorClass, TableEntity>>;
  getTables(): Promise<Either<ErrorClass, TableEntity[]>>;
  updateTable(
    id: string,
    table: TableModel
  ): Promise<Either<ErrorClass, TableEntity>>;
  deleteTable(id: string): Promise<Either<ErrorClass, void>>;
}
