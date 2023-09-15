import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { TaxRateEntity, TaxRateModel } from "../entities/tax-rate";
import { TaxRateRepository } from "../repositories/tax-rate";

export interface UpdateTaxRateUseCase {
  execute: (
    taxRateId: string,
    taxRateData: TaxRateModel
  ) => Promise<Either<ErrorClass, TaxRateEntity>>;
}

export class UpdateTaxRate implements UpdateTaxRateUseCase {
  private readonly taxRateRepository: TaxRateRepository;

  constructor(taxRateRepository: TaxRateRepository) {
    this.taxRateRepository = taxRateRepository;
  }

  async execute(
    taxRateId: string,
    taxRateData: TaxRateModel
  ): Promise<Either<ErrorClass, TaxRateEntity>> {
    return await this.taxRateRepository.updateTaxRate(taxRateId, taxRateData);
  }
}

