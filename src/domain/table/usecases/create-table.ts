import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { TableEntity, TableModel } from "../entities/table";
import { TableRepository } from "../repositories/table-repository";

export interface CreateTableUsecase {
  execute: (tableData: TableModel) => Promise<Either<ErrorClass, TableEntity>>;
}

export class CreateTable implements CreateTableUsecase {
  private readonly tableRepository: TableRepository;

  constructor(tableRepository: TableRepository) {
    this.tableRepository = tableRepository;
  }

  async execute(
    tableData: TableModel
  ): Promise<Either<ErrorClass, TableEntity>> {
    return await this.tableRepository.createTable(tableData);
  }
}
