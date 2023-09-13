import { ErrorClass } from "@presentation/error-handling/api-error";
import { BookingRequestEntity, BookingRequestModel } from "../entities/bookingRequest_entities"; // Import the BookingRequestModel and BookingRequestEntity
import { BookingRequestRepository } from "../repositories/bookingRequest-repo"; // Import the BookingRequestRepository
import { Either, Right, Left } from "monet";

export interface CreateBookingRequestUsecase {
    execute: (requestData: BookingRequestModel) => Promise<Either<ErrorClass, BookingRequestEntity>>;
}

export class CreateBookingRequest implements CreateBookingRequestUsecase {
    private readonly bookingRequestRepository: BookingRequestRepository;
    constructor(bookingRequestRepository: BookingRequestRepository) {
        this.bookingRequestRepository = bookingRequestRepository;
    }

    async execute(requestData: BookingRequestModel): Promise<Either<ErrorClass, BookingRequestEntity>> {
        return await this.bookingRequestRepository.createBookingRequest(requestData);
    }
}
