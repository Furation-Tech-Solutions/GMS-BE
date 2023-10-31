import { BookingRequestEntity, BookingRequestModel } from "@domain/bookingRequest/entities/bookingRequest_entities"; // Import the BookingRequestModel and BookingRequestEntity
import { BookingRequestRepository } from "@domain/bookingRequest/repositories/bookingRequest-repo"; // Import the BookingRequestRepository
import { BookingRequestDataSource } from "../datasource/bookingRequest-datasource"; // Import the BookingRequestDataSource
import { Either, Right, Left } from "monet";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";

export class BookingRequestRepositoryImpl implements BookingRequestRepository {
    private readonly bookingRequestDataSource: BookingRequestDataSource; 
    constructor(bookingRequestDataSource: BookingRequestDataSource) { 
        this.bookingRequestDataSource = bookingRequestDataSource;
    }

    async createBookingRequest(bookingRequest: BookingRequestModel): Promise<Either<ErrorClass, BookingRequestEntity>> {
        try {
            const createdRequest = await this.bookingRequestDataSource.create(bookingRequest); // Use the booking request data source
            return Right<ErrorClass, BookingRequestEntity>(createdRequest);
        } catch (error) {
            if (error instanceof ApiError && error.name === "conflict") {
                return Left<ErrorClass, BookingRequestEntity>(ApiError.bookingRequestExists());
            }
            return Left<ErrorClass, BookingRequestEntity>(ApiError.badRequest());
        }
    }

    async deleteBookingRequest(id: string): Promise<Either<ErrorClass, void>> {
        try {
            const result = await this.bookingRequestDataSource.delete(id); // Use the booking request data source
            return Right<ErrorClass, void>(result); // Return Right if the deletion was successful
        } catch (e) {
            if (e instanceof ApiError && e.name === "notfound") {
                return Left<ErrorClass, void>(ApiError.notFound());
            }
            return Left<ErrorClass, void>(ApiError.badRequest());
        }
    }

    async updateBookingRequest(id: string, data: BookingRequestEntity): Promise<Either<ErrorClass, BookingRequestEntity>> {
        try {
            const updatedRequest = await this.bookingRequestDataSource.update(id, data); // Use the booking request data source
            return Right<ErrorClass, BookingRequestEntity>(updatedRequest);
        } catch (e) {
            if (e instanceof ApiError && e.name === "conflict") {
                return Left<ErrorClass, BookingRequestEntity>(ApiError.bookingRequestExists());
            }
            return Left<ErrorClass, BookingRequestEntity>(ApiError.badRequest());
        }
    }

    async getAllBookingRequests(outletId:string): Promise<Either<ErrorClass, BookingRequestEntity[]>> {
        try {
            const requests = await this.bookingRequestDataSource.getAllBookingRequests(outletId); // Use the booking request data source
            return Right<ErrorClass, BookingRequestEntity[]>(requests);
        } catch (e) {
            if (e instanceof ApiError && e.name === "notfound") {
                return Left<ErrorClass, BookingRequestEntity[]>(ApiError.notFound());
            }
            return Left<ErrorClass, BookingRequestEntity[]>(ApiError.badRequest());
        }
    }

    async getBookingRequestById(id: string): Promise<Either<ErrorClass, BookingRequestEntity>> {
        try {
            const request = await this.bookingRequestDataSource.read(id); // Use the booking request data source
            return request
                ? Right<ErrorClass, BookingRequestEntity>(request)
                : Left<ErrorClass, BookingRequestEntity>(ApiError.notFound());
        } catch (e) {
            if (e instanceof ApiError && e.name === "notfound") {
                return Left<ErrorClass, BookingRequestEntity>(ApiError.notFound());
            }
            return Left<ErrorClass, BookingRequestEntity>(ApiError.badRequest());
        }
    }
}
