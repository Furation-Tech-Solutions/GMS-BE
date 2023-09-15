import { ReservationTagCategoryEntity, ReservationTagCategoryModel } from "@domain/reservation-tag-category/entities/reservation_tag_category_entities";
import { ReservationTagCategoryRepository } from "@domain/reservation-tag-category/repositories/reservation_tag_category-repo";
import { ReservationTagCategoryDataSource } from "../datasource/reservation_tag_Category-datasource";
import { Either, Right, Left } from "monet";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";

export class ReservationTagCategoryRepositoryImpl implements ReservationTagCategoryRepository {
    private readonly reservationTagCategoryDataSource: ReservationTagCategoryDataSource;
    
    constructor(reservationTagCategoryDataSource: ReservationTagCategoryDataSource) {
        this.reservationTagCategoryDataSource = reservationTagCategoryDataSource;
    }

    async createReservationTagCategory(reservationTagCategory: ReservationTagCategoryModel): Promise<Either<ErrorClass, ReservationTagCategoryEntity>> {
        try {
            const createdReservationTagCategory = await this.reservationTagCategoryDataSource.create(reservationTagCategory);
            return Right<ErrorClass, ReservationTagCategoryEntity>(createdReservationTagCategory);
        } catch (error) {
            if (error instanceof ApiError && error.name === "conflict") {
                return Left<ErrorClass, ReservationTagCategoryEntity>(ApiError.emailExist());
            }
            return Left<ErrorClass, ReservationTagCategoryEntity>(ApiError.badRequest());
        }
    }

    async deleteReservationTagCategory(id: string): Promise<Either<ErrorClass, void>> {
        try {
            const result = await this.reservationTagCategoryDataSource.delete(id);
            return Right<ErrorClass, void>(result);
        } catch (error) {
            if (error instanceof ApiError && error.name === "notfound") {
                return Left<ErrorClass, void>(ApiError.notFound());
            }
            return Left<ErrorClass, void>(ApiError.badRequest());
        }
    }

    async updateReservationTagCategory(id: string, data: ReservationTagCategoryModel): Promise<Either<ErrorClass, ReservationTagCategoryEntity>> {
        try {
            const updatedReservationTagCategory = await this.reservationTagCategoryDataSource.update(id, data);
            return Right<ErrorClass, ReservationTagCategoryEntity>(updatedReservationTagCategory);
        } catch (error) {
            if (error instanceof ApiError && error.name === "conflict") {
                return Left<ErrorClass, ReservationTagCategoryEntity>(ApiError.emailExist());
            }
            return Left<ErrorClass, ReservationTagCategoryEntity>(ApiError.badRequest());
        }
    }

    async getAllReservationTagCategories(): Promise<Either<ErrorClass, ReservationTagCategoryEntity[]>> {
        try {
            const reservationTagCategories = await this.reservationTagCategoryDataSource.getAll();
            return Right<ErrorClass, ReservationTagCategoryEntity[]>(reservationTagCategories);
        } catch (error) {
            if (error instanceof ApiError && error.name === "notfound") {
                return Left<ErrorClass, ReservationTagCategoryEntity[]>(ApiError.notFound());
            }
            return Left<ErrorClass, ReservationTagCategoryEntity[]>(ApiError.badRequest());
        }
    }

    async getTagReservationCategoryById(id: string): Promise<Either<ErrorClass, ReservationTagCategoryEntity>> {
        try {
            const reservationTagCategory = await this.reservationTagCategoryDataSource.read(id);
            return reservationTagCategory
                ? Right<ErrorClass, ReservationTagCategoryEntity>(reservationTagCategory)
                : Left<ErrorClass, ReservationTagCategoryEntity>(ApiError.notFound());
        } catch (error) {
            if (error instanceof ApiError && error.name === "notfound") {
                return Left<ErrorClass, ReservationTagCategoryEntity>(ApiError.notFound());
            }
            return Left<ErrorClass, ReservationTagCategoryEntity>(ApiError.badRequest());
        }
    }
}
