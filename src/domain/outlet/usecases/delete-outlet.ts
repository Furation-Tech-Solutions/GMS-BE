import { type OutletRepository } from "@domain/outlet/repositories/outlet-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
export interface DeleteOutletUsecase {
  execute: (outletId: string) => Promise<Either<ErrorClass, void>>
}
export class DeleteOutlet implements DeleteOutletUsecase {
  private readonly outletRepository: OutletRepository;
  constructor(outletRepository: OutletRepository) {
    this.outletRepository = outletRepository;
  }
  async execute(outletId: string): Promise<Either<ErrorClass, void>> {
    return await this.outletRepository.deleteOutlet(outletId)
  }
}