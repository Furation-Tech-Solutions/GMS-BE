import { OutletModel, OutletEntity } from "@domain/outlet/entities/outlet";
import { OutletRepository } from "@domain/outlet/repositories/outlet-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";


export interface CreateOutletUsecase {
  execute: (
    outletData: OutletModel) => Promise<Either<ErrorClass, OutletEntity>>;
}

export class CreateOutlet implements CreateOutletUsecase {
  private readonly outletRepository: OutletRepository;

  constructor(outletRepository: OutletRepository) {
    this.outletRepository = outletRepository;
  }

  async execute(outletData: OutletModel): Promise<Either<ErrorClass, OutletEntity>> {
    return await this.outletRepository.createOutlet(outletData);
  }
}

