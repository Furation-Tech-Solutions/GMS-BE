import { OutletEntity } from "@domain/outlet/entities/outlet";
import { OutletRepository } from "@domain/outlet/repositories/outlet-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
export interface GetAllOutletsUsecase {
  execute: () => Promise<Either<ErrorClass, OutletEntity[]>>;
}

export class GetAllOutlets implements GetAllOutletsUsecase {
  private readonly outletRepository: OutletRepository;

  constructor(outletRepository: OutletRepository) {
    this.outletRepository = outletRepository;
  }

  async execute(): Promise<Either<ErrorClass, OutletEntity[]>> {
    return await this.outletRepository.getOutlets();
  }
}
