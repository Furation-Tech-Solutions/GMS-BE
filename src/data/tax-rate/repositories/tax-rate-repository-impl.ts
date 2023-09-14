import { TaxRateRepository } from "@domain/tax-rate/repositories/tax-rate";
import { TaxRateDataSource } from "../datasources/tax-rate-data-source";
import { TaxRateEntity, TaxRateModel } from "@domain/tax-rate/entities/tax-rate";
import { Either, Left, Right } from "monet";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";



export class TaxRateRepositoryImpl implements TaxRateRepository {
    private readonly dataSource: TaxRateDataSource ;
  
    constructor(dataSource: TaxRateDataSource) {
      this.dataSource = dataSource;
    }
  
    async createTaxRate(
      taxRate: TaxRateModel 
    ): Promise<Either<ErrorClass, TaxRateEntity>> {
      try {
        let i = await this.dataSource.create(taxRate);
        return Right<ErrorClass, TaxRateEntity>(i);
      } catch (e) {
        if (typeof ApiError.taxTypeExist) {
          return Left<ErrorClass, TaxRateEntity>(ApiError.taxTypeExist());
        }
        return Left<ErrorClass, TaxRateEntity>(ApiError.badRequest());
      }
     }
     async getTaxRate():Promise<Either<ErrorClass,TaxRateEntity[]>>{
      try{
        const response = await this.dataSource.getAll();
        return Right<ErrorClass, TaxRateEntity[]>(response);
      }
      catch(error){
        return Left<ErrorClass, TaxRateEntity[]>(ApiError.badRequest());
      
      }
    }
    async deleteTaxRate(id: string): Promise<Either<ErrorClass, void>> {
      // await this.dataSource.delete(id);
      try {
        const i = await this.dataSource.delete(id);
        return Right<ErrorClass, void>(i);
      } catch (e) {
        return Left<ErrorClass, void>(ApiError.badRequest());
      }
    }
    async getTaxRateById(id: string): Promise<Either<ErrorClass, TaxRateEntity>> {
      try {
          const taxRate = await this.dataSource.read(id); // Use the client data source
          return taxRate
              ? Right<ErrorClass, TaxRateEntity>(taxRate)
              : Left<ErrorClass, TaxRateEntity>(ApiError.notFound());
      } catch (e) {
          if (e instanceof ApiError && e.name === "notfound") {
              return Left<ErrorClass, TaxRateEntity>(ApiError.notFound());
          }
          return Left<ErrorClass, TaxRateEntity>(ApiError.badRequest());
      }
  }
  async updateTaxRate(id: string, data: TaxRateModel): Promise<Either<ErrorClass, TaxRateEntity>> {
    try {
        const updatedTaxRate = await this.dataSource.update(id, data); // Use the client data source
        return Right<ErrorClass, TaxRateEntity>(updatedTaxRate);
    } catch (e) {
        if (e instanceof ApiError && e.name === "conflict") {
            return Left<ErrorClass, TaxRateEntity>(ApiError.clientExist());
        }
        return Left<ErrorClass, TaxRateEntity>(ApiError.badRequest());
    }
}
    }