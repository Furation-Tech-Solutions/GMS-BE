import { NextFunction, Request, Response } from "express";

import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { CreateBlackouDayUsecase } from "@domain/availibility/usecases/black-out-day/create-usecase";
import { UpdateBlackouDayUsecase } from "@domain/availibility/usecases/black-out-day/update-usecase";
import { DeleteBlackouDayUsecase } from "@domain/availibility/usecases/black-out-day/delete-usecase";
import { GetBlackouDayByIdUsecase } from "@domain/availibility/usecases/black-out-day/get-by-id-usecase";
import { GetAllBlackouDayUsecase } from "@domain/availibility/usecases/black-out-day/getall-usecase";
import { BlackoutDayEntity, BlackoutDayMapper, BlackoutDayModel } from "@domain/availibility/entities/black-out-day-entity";

export class BlackoutDayService {
    private readonly createBlackouDayUsecase: CreateBlackouDayUsecase;
    private readonly deleteBlackouDayUsecase: DeleteBlackouDayUsecase;
    private readonly getBlackouDayByIdUsecase: GetBlackouDayByIdUsecase;
    private readonly updateBlackouDayUsecase: UpdateBlackouDayUsecase;
    private readonly getAllBlackouDayUsecase: GetAllBlackouDayUsecase;

    constructor(
        createBlackouDayUsecase: CreateBlackouDayUsecase,
        deleteBlackouDayUsecase: DeleteBlackouDayUsecase,
        getBlackouDayByIdUsecase: GetBlackouDayByIdUsecase,
        updateBlackouDayUsecase: UpdateBlackouDayUsecase,
        getAllBlackouDayUsecase: GetAllBlackouDayUsecase
    ) {
        this.createBlackouDayUsecase = createBlackouDayUsecase;
        this.deleteBlackouDayUsecase = deleteBlackouDayUsecase;
        this.getBlackouDayByIdUsecase = getBlackouDayByIdUsecase;
        this.updateBlackouDayUsecase = updateBlackouDayUsecase;
        this.getAllBlackouDayUsecase = getAllBlackouDayUsecase;
    }


    async createBlackouDay(req: Request, res: Response): Promise<void> {

        const blackouDayData: BlackoutDayModel = BlackoutDayMapper.toModel(req.body);

        const newBlackouDay: Either<ErrorClass, BlackoutDayEntity> =
            await this.createBlackouDayUsecase.execute(blackouDayData);

        newBlackouDay.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: BlackoutDayEntity) => {
                const resData = BlackoutDayMapper.toEntity(result, true);
                return res.json(resData);
            }
        );
    }


    async deleteBlackouDay(req: Request, res: Response): Promise<void> {
        const blackoutId: string = req.params.blackoutId;

        // Call the DeleteAdminUsecase to delete the admin
        const response: Either<ErrorClass, void> =
            await this.deleteBlackouDayUsecase.execute(blackoutId);

        (await response).cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: void) => {
                return res.json({ message: "blackoutDay deleted successfully." });
            }
        );
    }


    async getBlackouDayById(req: Request, res: Response): Promise<void> {

        const blackoutId: string = req.params.blackoutId;
        // Call the getProgramScheduleById to get the [program] by ID
        const blackoutDay: Either<ErrorClass, BlackoutDayEntity> =
            await this.getBlackouDayByIdUsecase.execute(blackoutId);

        blackoutDay.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: BlackoutDayEntity) => {
                const resData = BlackoutDayMapper.toEntity(result, true);
                return res.json(resData);
            }
        );
    }


    async updateBlackouDay(req: Request, res: Response): Promise<void> {
        const blackoutId: string = req.params.blackoutId;
        const blackouDayData: BlackoutDayModel = req.body;
        // Get the existing admin by ID
        const existingBlackouDayData: Either<ErrorClass, BlackoutDayEntity> =
            await this.getBlackouDayByIdUsecase.execute(blackoutId);

        existingBlackouDayData.cata(
            (error: ErrorClass) => {
                res.status(error.status).json({ error: error.message });
            },
            async (result: BlackoutDayEntity) => {
                const resData = BlackoutDayMapper.toEntity(result, true);
                const updatedBlackouDayEntity: BlackoutDayEntity = BlackoutDayMapper.toEntity(
                    blackouDayData,
                    true,
                    resData
                );

                // Call the UpdateAdminUsecase to update the admin
                const updatedBlackoutDayData: Either<ErrorClass, BlackoutDayEntity> =
                    await this.updateBlackouDayUsecase.execute(blackoutId, updatedBlackouDayEntity);

                updatedBlackoutDayData.cata(
                    (error: ErrorClass) => {
                        res.status(error.status).json({ error: error.message });
                    },
                    (response: BlackoutDayEntity) => {
                        // Convert updatedAdmin from AdminEntity to plain JSON object using AdminMapper
                        const responseData = BlackoutDayMapper.toModel(response);

                        // Send the updated admin as a JSON response
                        res.json(responseData);
                    }
                );
            }
        );
    }


    async getAllBlackouDay(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        // Call the GetAllAdminsUsecase to get all admins
        const blackouDays: Either<ErrorClass, BlackoutDayEntity[]> =
            await this.getAllBlackouDayUsecase.execute();

        blackouDays.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (blackouDays: BlackoutDayEntity[]) => {
                const resData = blackouDays.map((blackouDay) => BlackoutDayMapper.toEntity(blackouDay));
                return res.json(resData);
            }
        );
    }


}
