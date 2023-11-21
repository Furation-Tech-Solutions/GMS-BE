import { NextFunction, Request, Response } from "express";
import {
    ReservationTagEntity,
    ReservationTagMapper,
    ReservationTagModel,
} from "@domain/reservation-tag/entities/reservation-tag-entities"; // Import tag category-related entities and mapper
import { CreateReservantionTagUsecase } from "@domain/reservation-tag/usecases/create-reservation-tag"; // Import tag category-related use cases
import { DeleteReservationTagUsecase } from "@domain/reservation-tag/usecases/delete-reservation-tag";
import { GetReservationTagByIdUsecase } from "@domain/reservation-tag/usecases/get-reservation-tag-by-id";
import { GetAllReservationtagUsecase } from "@domain/reservation-tag/usecases/get-all-reservation-tag";
import { UpdateReservationTagUsecase } from "@domain/reservation-tag/usecases/update-reservation-tag";
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";

export class ReservationTagServices {
    private readonly createReservantionTagUsecase: CreateReservantionTagUsecase;
    private readonly deleteReservationTagUsecase: DeleteReservationTagUsecase;
    private readonly getReservationTagByIdUsecase: GetReservationTagByIdUsecase;
    private readonly getAllReservationtagUsecase: GetAllReservationtagUsecase;
    private readonly updateReservationTagUsecase: UpdateReservationTagUsecase;

    constructor(
        createReservantionTagUsecase: CreateReservantionTagUsecase,
        deleteReservationTagUsecase: DeleteReservationTagUsecase,
        getReservationTagByIdUsecase: GetReservationTagByIdUsecase,
        getAllReservationtagUsecase: GetAllReservationtagUsecase,
        updateReservationTagUsecase: UpdateReservationTagUsecase,
    ) {
        this.createReservantionTagUsecase = createReservantionTagUsecase;
        this.deleteReservationTagUsecase = deleteReservationTagUsecase;
        this.getReservationTagByIdUsecase = getReservationTagByIdUsecase;
        this.getAllReservationtagUsecase = getAllReservationtagUsecase;
        this.updateReservationTagUsecase = updateReservationTagUsecase;
    }

    async createReservationTag(req: Request, res: Response): Promise<void> {
        const user=req.user
        const outletId=req.outletId
        const newReservationTagData={
            ...req.body,
            outletId:outletId,
            createdBy:user._id,
            updatedBy:user._id
        }
        const reservationTagData: ReservationTagModel = ReservationTagMapper.toModel(newReservationTagData);

        const newReservationTag: Either<ErrorClass, ReservationTagEntity> =
            await this.createReservantionTagUsecase.execute(reservationTagData);

        newReservationTag.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: ReservationTagEntity) => {
                const resData = ReservationTagMapper.toEntity(result, true);
                return res.status(201).json(resData);
            }
        );
    }

    async deleteReservationTag(req: Request, res: Response): Promise<void> {
        const reservationTagId: string = req.params.ReservationTagId;

        const deletedReservationTag: Either<ErrorClass, void> =
            await this.deleteReservationTagUsecase.execute(reservationTagId);

        deletedReservationTag.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: void) => {
                return res.status(204).json({ message: "Reservation Tag deleted successfully." });
            }
        );
    }

    async getReservationTagById(req: Request, res: Response): Promise<void> {
        const reservationTagId: string = req.params.ReservationTagId;

        const reservationTag: Either<ErrorClass, ReservationTagEntity> =
            await this.getReservationTagByIdUsecase.execute(reservationTagId);

        reservationTag.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: ReservationTagEntity) => {
                if (!result) {
                    return res.status(404).json({ message: "Reservation Tag not found." });
                }
                const resData = ReservationTagMapper.toEntity(result);
                return res.status(200).json(resData);
            }
        );
    }

    async getAllReservationTags(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const outletId=req.outletId as string
        const reservationTags: Either<ErrorClass, ReservationTagEntity[]> =
            await this.getAllReservationtagUsecase.execute(outletId);

        reservationTags.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: ReservationTagEntity[]) => {
                const responseData = result.map((tag) =>
                    ReservationTagMapper.toEntity(tag)
                );
                return res.status(200).json(responseData);
            }
        );
    }

    async updateReservationTag(req: Request, res: Response): Promise<void> {
        const reservationTagId: string = req.params.ReservationTagId;
        const user=req.user
        const newReservationTagData={
            ...req.body,
            updatedBy:user._id
        }
        const reservationTagData: ReservationTagModel = newReservationTagData;

        const existingReservationTag: Either<ErrorClass, ReservationTagEntity> =
            await this.getReservationTagByIdUsecase.execute(reservationTagId);

        existingReservationTag.cata(
            (error: ErrorClass) => {
                res.status(error.status).json({ error: error.message });
            },
            async (existingReservationTagData: ReservationTagEntity) => {
                const updatedReservationTagEntity: ReservationTagEntity = ReservationTagMapper.toEntity(
                    reservationTagData,
                    true,
                    existingReservationTagData
                );

                const updatedReservationTag: Either<ErrorClass, ReservationTagEntity> =
                    await this.updateReservationTagUsecase.execute(
                        reservationTagId,
                        updatedReservationTagEntity
                    );

                updatedReservationTag.cata(
                    (error: ErrorClass) => {
                        res.status(error.status).json({ error: error.message });
                    },
                    (result: ReservationTagEntity) => {
                        const resData = ReservationTagMapper.toEntity(result, true);
                        res.status(200).json(resData);
                    }
                );
            }
        );
    }
}