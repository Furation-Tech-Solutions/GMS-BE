import { OutletEntity, OutletModel } from "@domain/outlet/entities/outlet";
import { OutletRepository } from "@domain/outlet/repositories/outlet-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
export interface UpdateOutletUsecase {
  execute: (
    outletId: string,
    outletData: OutletModel
  ) => Promise<Either<ErrorClass, OutletEntity>>;
}

export class UpdateOutlet implements UpdateOutletUsecase {
  private readonly outletRepository: OutletRepository;

  constructor(outletRepository: OutletRepository) {
    this.outletRepository = outletRepository;
  }

  async execute(
    outletId: string,
    outletData: OutletModel
  ): Promise<Either<ErrorClass, OutletEntity>> {
    return await this.outletRepository.updateOutlet(outletId, outletData);
  }
}