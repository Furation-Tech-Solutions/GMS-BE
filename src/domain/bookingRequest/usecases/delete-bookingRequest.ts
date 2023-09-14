import { Either } from "monet";
import { BookingRequestRepository } from "../repositories/bookingRequest-repo"; // Import the BookingRequestRepository
import { ErrorClass } from "@presentation/error-handling/api-error";

export interface DeleteBookingRequestUsecase {
    execute: (requestID: string) => Promise<Either<ErrorClass, void>>;
}

export class DeleteBookingRequest implements DeleteBookingRequestUsecase {
    private readonly bookingRequestRepository: BookingRequestRepository;

    constructor(bookingRequestRepository: BookingRequestRepository) {
        this.bookingRequestRepository = bookingRequestRepository;
    }

    async execute(requestID: string): Promise<Either<ErrorClass, void>> {
        return await this.bookingRequestRepository.deleteBookingRequest(requestID);
    }
}
