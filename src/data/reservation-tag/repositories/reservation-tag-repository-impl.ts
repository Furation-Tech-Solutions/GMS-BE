import { ReservationTagEntity, ReservationTagModel } from "@domain/reservation-tag/entities/reservation-tag-entities"; // Import the TagModel
import { ReservationTagRepository } from "@domain/reservation-tag/repositories/reservation-tag-repo"; // Import the TagRepository
import { ReservationTagDataSource } from "../datasources/reservation-tag-data-source"; // Import the TagDataSource
import { Either, Right, Left } from "monet";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";

export class ReservationTagRepositoryImpl implements ReservationTagRepository {
    private readonly reservationTagDataSource: ReservationTagDataSource;
    constructor(reservationTagDataSource: ReservationTagDataSource) {
        this.reservationTagDataSource = reservationTagDataSource;
    }

    async createReservationTag(reservationTag: ReservationTagModel): Promise<Either<ErrorClass, ReservationTagEntity>> {
        try {
            const createdTag = await this.reservationTagDataSource.create(reservationTag); // Use the tag category data source
            return Right<ErrorClass, ReservationTagEntity>(createdTag);
        } catch (error) {
            if (error instanceof ApiError && error.name === "conflict") {
                return Left<ErrorClass, ReservationTagEntity>(ApiError.emailExist());
            }
            return Left<ErrorClass, ReservationTagEntity>(ApiError.badRequest());
        }
    }

    async deleteReservationTag(id: string): Promise<Either<ErrorClass, void>> {
        try {
            const result = await this.reservationTagDataSource.delete(id); // Use the tag  data source
            return Right<ErrorClass, void>(result); // Return Right if the deletion was successful
        } catch (e) {
            if (e instanceof ApiError && e.name === "notfound") {
                return Left<ErrorClass, void>(ApiError.notFound());
            }
            return Left<ErrorClass, void>(ApiError.badRequest());
        }
    }

    async updateReservationTag(id: string, data: ReservationTagModel): Promise<Either<ErrorClass, ReservationTagEntity>> {
        try {
            const updatedTag = await this.reservationTagDataSource.update(id, data); // Use the tag category data source
            return Right<ErrorClass, ReservationTagEntity>(updatedTag);
        } catch (e) {
            if (e instanceof ApiError && e.name === "conflict") {
                return Left<ErrorClass, ReservationTagEntity>(ApiError.emailExist());
            }
            return Left<ErrorClass, ReservationTagEntity>(ApiError.badRequest());
        }
    }

    async getAllReservationTag(outletId:string): Promise<Either<ErrorClass, ReservationTagEntity[]>> {
        try {
            const reservationTags = await this.reservationTagDataSource.getAll(outletId);
            return Right<ErrorClass, ReservationTagEntity[]>(reservationTags);
        } catch (error) {
            if (error instanceof ApiError && error.name === "notfound") {
                return Left<ErrorClass, ReservationTagEntity[]>(ApiError.notFound());
            }
            return Left<ErrorClass, ReservationTagEntity[]>(ApiError.badRequest());
        }
    }

    async getTagReservationById(id: string): Promise<Either<ErrorClass, ReservationTagEntity>> {
        try {
            const tag = await this.reservationTagDataSource.read(id); // Use the tag data source
            return tag
                ? Right<ErrorClass, ReservationTagEntity>(tag)
                : Left<ErrorClass, ReservationTagEntity>(ApiError.notFound());
        } catch (e) {
            if (e instanceof ApiError && e.name === "notfound") {
                return Left<ErrorClass, ReservationTagEntity>(ApiError.notFound());
            }
            return Left<ErrorClass, ReservationTagEntity>(ApiError.badRequest());
        }
    }
}