import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { TableEntity } from "../entities/table";
import { TableRepository } from "../repositories/table-repository";

export interface GetAllTablesUsecase {
  execute: () => Promise<Either<ErrorClass, TableEntity[]>>;
}

export class GetAllTables implements GetAllTablesUsecase {
  private readonly tableRepository: TableRepository;

  constructor(tableRepository: TableRepository) {
    this.tableRepository = tableRepository;
  }

  async execute(): Promise<Either<ErrorClass, TableEntity[]>> {
    return await this.tableRepository.getTables();
  }
}
