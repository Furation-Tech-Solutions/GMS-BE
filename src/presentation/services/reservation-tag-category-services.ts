import { NextFunction, Request, Response } from "express";
import { ReservationTagCategoryEntity, ReservationTagCategoryModel, ReservationTagCategoryMapper } from "@domain/reservation-tag-category/entities/reservation_tag_category_entities"; // Import the reservation TagCategoryModel and reservation TagCategoryEntity // Import tag category-related entities and mapper
import { CreateReservationTagCategoryUsecase } from "@domain/reservation-tag-category/usecases/create-reservation_tags_category"; // Import tag category-related use cases
import { DeleteReservationTagCategoryUsecase } from "@domain/reservation-tag-category/usecases/delete-reservation_tags_category";
import { GetReservationTagCategoryByIdUsecase } from "@domain/reservation-tag-category/usecases/get-reservation_tag_category-by-id";
import { GetAllReservationtagCategoriesUsecase } from "@domain/reservation-tag-category/usecases/get-all-reservation_tag_category";
import { UpdateReservationTagCategoryUsecase } from "@domain/reservation-tag-category/usecases/update-reservation_tag_category";
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";

export class ReservationTagCategoryServices {
    private readonly createReservationTagCategoryUsecase: CreateReservationTagCategoryUsecase;
    private readonly deleteReservationTagCategoryUsecase: DeleteReservationTagCategoryUsecase;
    private readonly getReservationTagCategoryByIdUsecase: GetReservationTagCategoryByIdUsecase;
    private readonly getAllReservationtagCategoriesUsecase: GetAllReservationtagCategoriesUsecase;
    private readonly updateReservationTagCategoryUsecase: UpdateReservationTagCategoryUsecase;

    constructor(
        createReservationTagCategoryUsecase: CreateReservationTagCategoryUsecase,
        deleteReservationTagCategoryUsecase: DeleteReservationTagCategoryUsecase,
        getReservationTagCategoryByIdUsecase: GetReservationTagCategoryByIdUsecase,
        getAllReservationtagCategoriesUsecase: GetAllReservationtagCategoriesUsecase,
        updateReservationTagCategoryUsecase: UpdateReservationTagCategoryUsecase,
    ) {
        this.createReservationTagCategoryUsecase = createReservationTagCategoryUsecase;
        this.deleteReservationTagCategoryUsecase = deleteReservationTagCategoryUsecase;
        this.getReservationTagCategoryByIdUsecase = getReservationTagCategoryByIdUsecase;
        this.getAllReservationtagCategoriesUsecase = getAllReservationtagCategoriesUsecase;
        this.updateReservationTagCategoryUsecase = updateReservationTagCategoryUsecase;
    }

    async createReservationTagCategory(req: Request, res: Response): Promise<void> {
        const reservationTagCategoryData: ReservationTagCategoryModel = ReservationTagCategoryMapper.toModel(req.body);

        const newClientTagCategory: Either<ErrorClass, ReservationTagCategoryEntity> =
            await this.createReservationTagCategoryUsecase.execute(reservationTagCategoryData);

        newClientTagCategory.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: ReservationTagCategoryEntity) => {
                const resData = ReservationTagCategoryMapper.toEntity(result, true);
                return res.json(resData);
            }
        );
    }

    async deleteReservationTagCategory(req: Request, res: Response): Promise<void> {
        const reservationTagCategoryId: string = req.params.ReservationTagCategoryId;

        const deletedReservationTagCategory: Either<ErrorClass, void> =
            await this.deleteReservationTagCategoryUsecase.execute(reservationTagCategoryId);

            deletedReservationTagCategory.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: void) => {
                return res.json({ message: "Reservation Tag category deleted successfully." });
            }
        );
    }

    async getReservationTagCategoryById(req: Request, res: Response): Promise<void> {
        const reservationTagCategoryId: string = req.params.ReservationTagCategoryId;

        const reservationTagCategory: Either<ErrorClass, ReservationTagCategoryEntity> =
            await this.getReservationTagCategoryByIdUsecase.execute(reservationTagCategoryId);

            reservationTagCategory.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: ReservationTagCategoryEntity) => {
                if (!result) {
                    return res.json({ message: "Client Tag category not found." });
                }
                const resData = ReservationTagCategoryMapper.toEntity(result);
                return res.json(resData);
            }
        );
    }

    async getAllReservationTagCategories(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const reservationTagCategories: Either<ErrorClass, ReservationTagCategoryEntity[]> =
            await this.getAllReservationtagCategoriesUsecase.execute();

            reservationTagCategories.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: ReservationTagCategoryEntity[]) => {
                const responseData = result.map((tagCategory) =>
                    ReservationTagCategoryMapper.toEntity(tagCategory)
                );
                return res.json(responseData);
            }
        );
    }

    async updateReservationTagCategory(req: Request, res: Response): Promise<void> {
        const reservationTagCategoryId: string = req.params.ReservationTagCategoryId;
        const reservationTagCategoryData: ReservationTagCategoryModel = req.body;

        const existingReservationTagCategory: Either<ErrorClass, ReservationTagCategoryEntity> =
            await this.getReservationTagCategoryByIdUsecase.execute(reservationTagCategoryId);

        existingReservationTagCategory.cata(
            (error: ErrorClass) => {
                res.status(error.status).json({ error: error.message });
            },
            async (existingReservationTagCategoryData: ReservationTagCategoryEntity) => {
                const updatedReservationTagCategoryEntity: ReservationTagCategoryEntity = ReservationTagCategoryMapper.toEntity(
                    reservationTagCategoryData,
                    true,
                    existingReservationTagCategoryData
                );

                const updatedReservationTagCategory: Either<ErrorClass, ReservationTagCategoryEntity> =
                    await this.updateReservationTagCategoryUsecase.execute(
                        reservationTagCategoryId,
                        updatedReservationTagCategoryEntity
                    );

                    updatedReservationTagCategory.cata(
                    (error: ErrorClass) => {
                        res.status(error.status).json({ error: error.message });
                    },
                    (result: ReservationTagCategoryEntity) => {
                        const resData = ReservationTagCategoryMapper.toEntity(result, true);
                        res.json(resData);
                    }
                );
            }
        );
    }
}
