import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { TableEntity } from "../entities/table";
import { TableRepository } from "../repositories/table-repository";

export interface GetTableByIdUsecase {
  execute: (roomData: string) => Promise<Either<ErrorClass, TableEntity>>;
}

export class GetTableById implements GetTableByIdUsecase {
  private readonly tableRepository: TableRepository;

  constructor(tableRepository: TableRepository) {
    this.tableRepository = tableRepository;
  }

  async execute(tableId: string): Promise<Either<ErrorClass, TableEntity>> {
    return await this.tableRepository.getTableById(tableId);
  }
}
