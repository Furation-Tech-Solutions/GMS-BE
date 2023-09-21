import { NextFunction, Request, Response } from "express";

import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { CreateAccessRuleUsecase } from "@domain/availibility/usecases/access-rule/create-usecase";
import { UpdateAccessRuleUsecase } from "@domain/availibility/usecases/access-rule/update-usecase";
import { DeleteAccessRuleUsecase } from "@domain/availibility/usecases/access-rule/delete-usecase";
import { GetAllAccessRuleUsecase } from "@domain/availibility/usecases/access-rule/getall-accessrule-usecase";
import { GetAcessRuleByIdUsecase } from "@domain/availibility/usecases/access-rule/get-access-rule-by-id-usecase";
import { AccessRuleEntity, AccessRuleMapper, AccessRuleModel } from "@domain/availibility/entities/access-rule-entity";

export class AccessRuleService {
  private readonly createAccessRuleUsecase: CreateAccessRuleUsecase;
  private readonly updateGetAcessRuleUsecase: UpdateAccessRuleUsecase;
  private readonly getAccessRuleByIdUsecase: GetAcessRuleByIdUsecase;
  private readonly deleteAccessRuleUsecase: DeleteAccessRuleUsecase;
  private readonly getAllAccessRuleUsecase: GetAllAccessRuleUsecase;

  constructor(
    createAccessRuleUsecase: CreateAccessRuleUsecase,
    updateGetAcessRuleUsecase: UpdateAccessRuleUsecase,
    getAccessRuleByIdUsecase: GetAcessRuleByIdUsecase,
    deleteAccessRuleUsecase: DeleteAccessRuleUsecase,
    getAllAccessRuleUsecase: GetAllAccessRuleUsecase
  ) {
    this.createAccessRuleUsecase = createAccessRuleUsecase; 
    this.updateGetAcessRuleUsecase = updateGetAcessRuleUsecase;
    this.getAccessRuleByIdUsecase = getAccessRuleByIdUsecase;
    this.deleteAccessRuleUsecase = deleteAccessRuleUsecase;
    this.getAllAccessRuleUsecase = getAllAccessRuleUsecase;
  }

  async createAccessRule(req: Request, res: Response): Promise<void> {
  
    const accessRuleData: AccessRuleModel = AccessRuleMapper.toModel(req.body);

    const newAccessRule: Either<ErrorClass, AccessRuleEntity> =
      await this.createAccessRuleUsecase.execute(accessRuleData);

      newAccessRule.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: AccessRuleEntity) => {
        const resData = AccessRuleMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
  }


  async updateAccessRule(req: Request, res: Response): Promise<void> {
    const shiftId: string = req.params.shiftId;
    const shiftData: AccessRuleModel = req.body;

    // Get the existing shift by ID
    const existingShift: Either<ErrorClass, AccessRuleEntity> =
      await this.getAccessRuleByIdUsecase.execute(shiftId);

     

      existingShift.cata(
      (error: ErrorClass) => {
        res.status(error.status).json({ error: error.message });
      },
      async (result: AccessRuleEntity) => {
        const resData = AccessRuleMapper.toEntity(result, true);
        const updatedShiftEntity: AccessRuleEntity = AccessRuleMapper.toEntity(
          shiftData,
          true,
          resData
        );

        res.json(updatedShiftEntity);
       

        // Call the UpdateAdminUsecase to update the admin
        // const updatedShift: Either<ErrorClass, ShiftEntity> =
        //   await this.updateShiftUsecase.execute(shiftId, updatedShiftEntity);

        // updatedShift.cata(
        //   (error: ErrorClass) => {
        //     res.status(error.status).json({ error: error.message });
        //   },
        //   (response: ShiftEntity) => {
        //     // Convert updatedShift from AdminEntity to plain JSON object using AdminMapper
        //     const responseData = ShiftMapper.toModel(response);

        //     // Send the updated admin as a JSON response
        //     res.json(responseData);
        //   }
        // );
      }
    );
  }


    async getAccessRuleById(req: Request, res: Response): Promise<void> {

    const shiftId: string = req.params.shiftId;

    // Call the GetAdminByIdUsecase to get the admin by ID
    const admin: Either<ErrorClass, AccessRuleEntity> =
      await this.getAccessRuleByIdUsecase.execute(shiftId);

    admin.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: AccessRuleEntity) => {
        const resData = AccessRuleMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
  }

    async deleteAccessRule(req: Request, res: Response): Promise<void> {
    const shiftId: string = req.params.shiftId;

    // Call the DeleteAdminUsecase to delete the admin
    const response: Either<ErrorClass, void> =
      await this.deleteAccessRuleUsecase.execute(shiftId);

    (await response).cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: void) => {
        return res.json({ message: "Shift deleted successfully." });
      }
    );
  }


  async getAllAccessRule(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    // Call the GetAllAdminsUsecase to get all admins
    const shifts: Either<ErrorClass, AccessRuleEntity[]> =
      await this.getAllAccessRuleUsecase.execute();

      shifts.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (shifts: AccessRuleEntity[]) => {
        const resData = shifts.map((shift) => AccessRuleMapper.toEntity(shift));
        return res.json(resData);
      }
    );
  }
}
