import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { TaxRateRepository } from "../repositories/tax-rate";


export interface DeleteTaxRateUseCase {
    execute: (taxRateID: string) => Promise<Either<ErrorClass, void>>;
}

export class DeleteTaxRate implements DeleteTaxRateUseCase {
    private readonly taxRateRepository: TaxRateRepository;

    constructor(taxRateRepository: TaxRateRepository) {
        this.taxRateRepository = taxRateRepository;
    }

    async execute(taxRateID: string): Promise<Either<ErrorClass, void>> {
        return await this.taxRateRepository.deleteTaxRate(taxRateID);
    }
}