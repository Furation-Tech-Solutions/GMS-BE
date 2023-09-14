import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { TaxRateEntity, TaxRateModel } from "../entities/tax-rate";
import { TaxRateRepository } from "../repositories/tax-rate";

export interface CreateTaxRateUseCase {
    execute: (
      taxRateData: TaxRateModel) => Promise<Either<ErrorClass, TaxRateEntity>>;
  }
  
  export class CreateTaxRate implements CreateTaxRateUseCase {
    private readonly taxRateRepository: TaxRateRepository ;
  
    constructor(taxRateRepository: TaxRateRepository) {
      this.taxRateRepository = taxRateRepository;
    }
  
    async execute(taxRateData: TaxRateModel): Promise<Either<ErrorClass, TaxRateEntity>> {
      return await this.taxRateRepository.createTaxRate(taxRateData);
    }
  }