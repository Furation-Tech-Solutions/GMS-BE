import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { TableEntity, TableModel } from "../entities/table";
import { TableRepository } from "../repositories/table-repository";


export interface UpdateTableUsecase {
  execute: (
    tableId: string,
    tableData: TableModel
  ) => Promise<Either<ErrorClass, TableEntity>>;
}

export class UpdateTable implements UpdateTableUsecase {
  private readonly tableRepository: TableRepository;

  constructor(tableRepository: TableRepository) {
    this.tableRepository = tableRepository;
  }

  async execute(
    tableId: string,
    tableData: TableModel
  ): Promise<Either<ErrorClass, TableEntity>> {
    return await this.tableRepository.updateTable(tableId, tableData);
  }
}
