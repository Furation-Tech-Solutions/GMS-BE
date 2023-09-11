import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { TableRepository } from "../repositories/table-repository";

export interface DeleteTableUsecase {
  execute: (tableId: string) => Promise<Either<ErrorClass, void>>;
}
export class DeleteTable implements DeleteTableUsecase {
  private readonly tableRepository: TableRepository;
  constructor(tableRepository: TableRepository) {
    this.tableRepository = tableRepository;
  }
  async execute(tableId: string): Promise<Either<ErrorClass, void>> {
    return await this.tableRepository.deleteTable(tableId);
  }
}
