import { BookingRequestEntity, BookingRequestModel } from "../entities/bookingRequest_entities"; // Import the BookingRequestEntity and BookingRequestModel classes
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";

export interface BookingRequestRepository {
    createBookingRequest(
        bookingRequest: BookingRequestModel
    ): Promise<Either<ErrorClass, BookingRequestEntity>>;
    deleteBookingRequest(id: string): Promise<Either<ErrorClass, void>>;
    getBookingRequestById(id: string): Promise<Either<ErrorClass, BookingRequestEntity>>;
    updateBookingRequest(
        id: string,
        data: BookingRequestModel
    ): Promise<Either<ErrorClass, BookingRequestEntity>>;
    getAllBookingRequests(): Promise<Either<ErrorClass, BookingRequestEntity[]>>;
}
