import { OutletModel, OutletEntity } from "@domain/outlet/entities/outlet";
import { OutletRepository } from "@domain/outlet/repositories/outlet-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface GetOutletByIdUsecase{
  execute: (
    outletData: string
  ) => Promise<Either<ErrorClass, OutletEntity>>;
}

export class GetOutletById implements GetOutletByIdUsecase {
  private readonly outletRepository: OutletRepository;

  constructor(outletRepository: OutletRepository) {
    this.outletRepository = outletRepository;
  }

  async execute(
    outletId: string
  ): Promise<Either<ErrorClass, OutletEntity>> {
    
    return await this.outletRepository.getOutletById(outletId);
  }
}