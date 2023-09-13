import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { TaxRateRepository } from "../repositories/tax-rate";
import { TaxRateEntity } from "../entities/tax-rate";


export interface GetAllTaxRateUseCase {
  execute: () => Promise<Either<ErrorClass, TaxRateEntity[]>>;
}

export class GetAllTaxRate implements GetAllTaxRateUseCase {
  private readonly taxRateRepository: TaxRateRepository;

  constructor(taxRateRepository: TaxRateRepository) {
    this.taxRateRepository = taxRateRepository;
  }

  async execute(): Promise<Either<ErrorClass, TaxRateEntity[]>> {
    return await this.taxRateRepository.getTaxRate();
  }
}
