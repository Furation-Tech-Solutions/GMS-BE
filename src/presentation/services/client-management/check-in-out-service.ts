import { NextFunction, Request, Response } from "express";

import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { CreateCheckInCheckOutUsecase } from "@domain/client-management/usecases/create-check-in-out-usecase";
import { DeleteCheckInCheckOutUsecase } from "@domain/client-management/usecases/delete-check-in-out-usecase";
import { GetCheckInCheckOutByIdUsecase } from "@domain/client-management/usecases/get-by-id-check-in-out-usecase";
import { UpdateCheckInCheckOutUsecase } from "@domain/client-management/usecases/update-check-in-out-usecase";
import { GetAllCheckInCheckOutUsecase } from "@domain/client-management/usecases/get-all-check-in-out-usecase";
import { CheckInCheckOutEntity, CheckInCheckOutMapper, CheckInCheckOutModel } from "@domain/client-management/entities/check-in-out-entities";

export class CheckInCheckOutService {
  private readonly createCheckInCheckOutUsecase: CreateCheckInCheckOutUsecase;
  private readonly deleteCheckInCheckOutUsecase: DeleteCheckInCheckOutUsecase;
  private readonly getCheckInCheckOutByIdUsecase: GetCheckInCheckOutByIdUsecase;
  private readonly updateCheckInCheckOutUsecase: UpdateCheckInCheckOutUsecase;
  private readonly getAllCheckInCheckOutUsecase: GetAllCheckInCheckOutUsecase;

  constructor(
    createCheckInCheckOutUsecase: CreateCheckInCheckOutUsecase,
    deleteCheckInCheckOutUsecase: DeleteCheckInCheckOutUsecase,
    getCheckInCheckOutByIdUsecase: GetCheckInCheckOutByIdUsecase,
    updateCheckInCheckOutUsecase: UpdateCheckInCheckOutUsecase,
    getAllCheckInCheckOutUsecase: GetAllCheckInCheckOutUsecase
  ) {
    this.createCheckInCheckOutUsecase = createCheckInCheckOutUsecase;
    this.deleteCheckInCheckOutUsecase = deleteCheckInCheckOutUsecase;
    this.getCheckInCheckOutByIdUsecase = getCheckInCheckOutByIdUsecase;
    this.updateCheckInCheckOutUsecase = updateCheckInCheckOutUsecase;
    this.getAllCheckInCheckOutUsecase = getAllCheckInCheckOutUsecase;
  }

  async createCheckInCheckOut(req: Request, res: Response): Promise<void> {
  
    const reservationId = req.params.reservationId

    const newcheckInCheckOutData: Either<ErrorClass,CheckInCheckOutEntity> =
      await this.createCheckInCheckOutUsecase.execute(reservationId);

      newcheckInCheckOutData.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: CheckInCheckOutEntity) => {
        const resData = CheckInCheckOutMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
  }


  async deleteCheckInCheckOut(req: Request, res: Response): Promise<void> {
    const checkId: string = req.params.adminId;

    // Call the DeleteAdminUsecase to delete the admin
    const response: Either<ErrorClass, void> =
      await this.deleteCheckInCheckOutUsecase.execute(checkId);

    (await response).cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: void) => {
        return res.json({ message: "check-in-check-out deleted successfully." });
      }
    );
  }


  async getCheckInCheckOutById(req: Request, res: Response): Promise<void> {
    // console.log(req.user);

    const checkId: string = req.params.checkId;
    // Call the GetAdminByIdUsecase to get the admin by ID
    const checkInCheckOut: Either<ErrorClass, CheckInCheckOutEntity> =
      await this.getCheckInCheckOutByIdUsecase.execute(checkId);

      checkInCheckOut.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: CheckInCheckOutEntity) => {
        const resData = CheckInCheckOutMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
  }


  async updateCheckInCheckOut(req: Request, res: Response): Promise<void> {
    const reservationId: string = req.params.reservationId;
    const checkInCheckOutData = req.body;

    
    // Get the existing admin by ID
    const existingCheckInCheckOut: Either<ErrorClass, CheckInCheckOutEntity> =
      await this.getCheckInCheckOutByIdUsecase.execute(reservationId);

    existingCheckInCheckOut.cata(
      (error: ErrorClass) => {
        res.status(error.status).json({ error: error.message });
      },
      async (result: CheckInCheckOutEntity) => {
        let id = result._id
        const resData = CheckInCheckOutMapper.toEntity(result, true);
        const updatedCheckInCheckOutDataEntity: CheckInCheckOutEntity = CheckInCheckOutMapper.toEntity(
          checkInCheckOutData,
          true,
          resData
        );

        // Call the UpdateAdminUsecase to update the admin
        if(id !== undefined){
          const updatedCheckInCheckOut: Either<ErrorClass, CheckInCheckOutEntity> =
          await this.updateCheckInCheckOutUsecase.execute(id,  updatedCheckInCheckOutDataEntity);
          
          updatedCheckInCheckOut.cata(
          (error: ErrorClass) => {
            res.status(error.status).json({ error: error.message });
          },
          (response: CheckInCheckOutEntity) => {
            // Convert updatedAdmin from AdminEntity to plain JSON object using AdminMapper
            const responseData = CheckInCheckOutMapper.toModel(response);

            // Send the updated admin as a JSON response
            res.json(responseData);
          }
        );
        }
    
      }
    );
  }

  async getAllCheckInCheckOuts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    // Call the GetAllAdminsUsecase to get all admins
    const checkInCheckOut: Either<ErrorClass, CheckInCheckOutEntity[]> =
      await this.getAllCheckInCheckOutUsecase.execute();

      checkInCheckOut.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (checkInCheckOuts: CheckInCheckOutEntity[]) => {
        const resData = checkInCheckOuts.map((checkInCheckOut) => CheckInCheckOutMapper.toEntity(checkInCheckOut));
        return res.json(resData);
      }
    );
  }
}
