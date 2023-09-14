import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { TaxRateRepository } from "../repositories/tax-rate";
import { TaxRateEntity } from "../entities/tax-rate";

export interface GetTaxRateByIdUseCase {
  execute: (taxRateID: string) => Promise<Either<ErrorClass, TaxRateEntity>>;
}

export class GetTaxRateById implements GetTaxRateByIdUseCase {
  private readonly taxRateRepository: TaxRateRepository; // Change to ClientRepository

  constructor(taxRateRepository: TaxRateRepository) {
    this.taxRateRepository = taxRateRepository;
  }

  async execute(taxRateID: string): Promise<Either<ErrorClass, TaxRateEntity>> {
    return await this.taxRateRepository.getTaxRateById(taxRateID); // Change to getClientById
  }
}
