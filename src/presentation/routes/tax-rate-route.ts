import { TaxRateDataSourceImpl } from "@data/tax-rate/datasources/tax-rate-data-source";
import { TaxRateRepositoryImpl } from "@data/tax-rate/repositories/tax-rate-repository-impl";
import { CreateTaxRate } from "@domain/tax-rate/usecases/create-tax-rate";
import { DeleteTaxRate } from "@domain/tax-rate/usecases/delete-tax-rate";
import { GetAllTaxRate } from "@domain/tax-rate/usecases/get-all-tax-rate";
import { GetTaxRateById } from "@domain/tax-rate/usecases/get-tax-rate-by-id";
import { UpdateTaxRate } from "@domain/tax-rate/usecases/update-tax-rate";
import { TaxRateService } from "@presentation/services/tax-rate-service";
import { Router } from "express";
import mongoose from "mongoose";


const mongooseConnection = mongoose.connection;

const taxRateDataSource=new TaxRateDataSourceImpl(mongooseConnection)
const taxRateRepository=new TaxRateRepositoryImpl(taxRateDataSource)

const createTaxRateUseCase=new CreateTaxRate(taxRateRepository)
// const getAllUserUseCase=new GetAllUsers(userRepository)
const getAllTaxRateUseCase=new GetAllTaxRate(taxRateRepository)
const deleteTaxRateUseCase=new DeleteTaxRate(taxRateRepository)
const getTaxRateByIdUseCase=new GetTaxRateById(taxRateRepository)
const updateTaxRateUseCase=new UpdateTaxRate(taxRateRepository)

const taxRateService=new TaxRateService(
    createTaxRateUseCase,
    getAllTaxRateUseCase,
    deleteTaxRateUseCase,
    getTaxRateByIdUseCase,
    updateTaxRateUseCase
    // getAllUserUseCase
)

export const taxRateRouter=Router()

taxRateRouter.post(
    "/create",
    taxRateService.createTaxRate.bind(taxRateService)
)
taxRateRouter.get(
    "/getAll",
    taxRateService.getAllTaxRate.bind(taxRateService)
 );
 taxRateRouter.delete(
    "/delete/:taxRateId",
    taxRateService.deleteTaxRate.bind(taxRateService)
 )
 taxRateRouter.get(
    "/getById/:taxRateId",
    taxRateService.getTaxRateById.bind(taxRateService)
);
taxRateRouter.put(
    "/update/:taxRateId",
    taxRateService.updateTaxRate.bind(taxRateService)
);