
import { TaxRateEntity, TaxRateMapper, TaxRateModel } from "@domain/tax-rate/entities/tax-rate";
import { CreateTaxRateUseCase } from "@domain/tax-rate/usecases/create-tax-rate";
import { DeleteTaxRateUseCase } from "@domain/tax-rate/usecases/delete-tax-rate";
import { GetAllTaxRateUseCase } from "@domain/tax-rate/usecases/get-all-tax-rate";
import { GetTaxRateByIdUseCase } from "@domain/tax-rate/usecases/get-tax-rate-by-id";
import { UpdateTaxRateUseCase } from "@domain/tax-rate/usecases/update-tax-rate";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { NextFunction, Request, Response } from "express";
import { Either } from "monet";


export class TaxRateService{
    private readonly createTaxRateUseCase:CreateTaxRateUseCase;
    private readonly getAllTaxRateUseCase:GetAllTaxRateUseCase;
    private readonly deleteTaxRateUseCase:DeleteTaxRateUseCase;
    private readonly getTaxRateByIdUseCase:GetTaxRateByIdUseCase;
    private readonly updateTaxRateUseCase:UpdateTaxRateUseCase
        
    // private readonly getAllUserUseCase:GetAllUserUseCase;
    constructor(
        createTaxRateUseCase:CreateTaxRateUseCase,
        getAllTaxRateUseCase:GetAllTaxRateUseCase,
        deleteTaxRateUseCase:DeleteTaxRateUseCase,
        getTaxRateByIdUseCase:GetTaxRateByIdUseCase,
        updateTaxRateUseCase:UpdateTaxRateUseCase
        // getAllUserUseCase:GetAllUserUseCase,
    ){
        this.createTaxRateUseCase = createTaxRateUseCase;
        this.getAllTaxRateUseCase=getAllTaxRateUseCase;
        this.deleteTaxRateUseCase=deleteTaxRateUseCase;
        this.getTaxRateByIdUseCase=getTaxRateByIdUseCase;
        this.updateTaxRateUseCase=updateTaxRateUseCase
        // this.getAllUserUseCase = getAllUserUseCase;
    }



async createTaxRate(req: Request, res: Response): Promise<void> {
    const user=req.user
    const newTaxRateData={
        ...req.body,
        createdBy:user._id,
        updatedBy:user._id
    }
    const taxRateData: TaxRateModel = TaxRateMapper.toModel(newTaxRateData);
    // console.log(req.body)

    const newRate: Either<ErrorClass, TaxRateEntity> =
      await this.createTaxRateUseCase.execute(taxRateData);

      newRate.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: TaxRateEntity) => {
        const resData = TaxRateMapper.toEntity(result, true);
        // console.log(resData,"resData")
        return res.json(resData);
      }
    );
  }
  async getAllTaxRate(
    req:Request,
    res:Response,
    next:NextFunction
    ):Promise<void>{
        const taxRate : Either<ErrorClass,TaxRateEntity[]>=
        await this.getAllTaxRateUseCase.execute();
        taxRate.cata(
            (error: ErrorClass) =>
              res.status(error.status).json({ error: error.message }),
            (taxRate: TaxRateEntity[]) => {
              const resData = taxRate.map((role) => TaxRateMapper.toEntity(role));
              return res.json(resData);
            }
          );
    }

    async deleteTaxRate(req: Request, res: Response): Promise<void> {
      const taxRateID: string = req.params.taxRateId;

      const deletedTaxRate: Either<ErrorClass, void> =
          await this.deleteTaxRateUseCase.execute(taxRateID);

          deletedTaxRate.cata(
          (error: ErrorClass) =>
              res.status(error.status).json({ error: error.message }),
          (result: void) => {

              return res.json({ message: "TaxRate role deleted successfully." });
          }
      );
  }

  async getTaxRateById(req: Request, res: Response): Promise<void> {
    const taxRateID: string = req.params.taxRateId;
    // console.log(TaxRateID,"acccessLevel id")


    const taxRate: Either<ErrorClass, TaxRateEntity> =
        await this.getTaxRateByIdUseCase.execute(taxRateID);

        taxRate.cata(
        (error: ErrorClass) =>
            res.status(error.status).json({ error: error.message }),
        (result: TaxRateEntity) => {
            if (result == undefined) {
                return res.json({ message: "Data Not Found" });
            }
            const resData = TaxRateMapper.toEntity(result);
            return res.json(resData)
        }
    );
}

async updateTaxRate(req: Request, res: Response): Promise<void> {
    const taxRateId: string = req.params.taxRateId;
    const user=req.user
    const newTaxRateData={
        ...req.body,
        updatedBy:user._id
    }
    const taxRateData: TaxRateModel = newTaxRateData;

    // console.log(TaxRateData,"data of access level",req.body)

    // Get the existing guest by ID
    const existingTaxRate: Either<ErrorClass, TaxRateEntity> =
        await this.getTaxRateByIdUseCase.execute(taxRateId);

        existingTaxRate.cata(
        (error: ErrorClass) => {
            res.status(error.status).json({ error: error.message });
        },
        async (existingTaxRate: TaxRateEntity) => {
            // Convert GuestData from GuestModel to GuestEntity using GuestMapper
            const updatedTaxRateEntity: TaxRateEntity = TaxRateMapper.toEntity(
                taxRateData,
                true,
                existingTaxRate
            );

            // Call the UpdateGuestUsecase to update the guest
            const updatedTaxRate: Either<ErrorClass, TaxRateEntity> =
                await this.updateTaxRateUseCase.execute(
                    taxRateId,
                    updatedTaxRateEntity
                );

                updatedTaxRate.cata(
                (error: ErrorClass) => {
                    res.status(error.status).json({ error: error.message });
                },
                (result: TaxRateEntity) => {
                    const resData = TaxRateMapper.toEntity(result, true);
                    res.json(resData);
                }
            );
        }
    );
}
}