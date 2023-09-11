import { Either } from "monet";
import { BookingRequestEntity } from "../entities/bookingRequest_entities"; // Import the BookingRequestEntity
import { BookingRequestRepository } from "../repositories/bookingRequest-repo"; // Import the BookingRequestRepository
import { ErrorClass } from "@presentation/error-handling/api-error";

export interface GetBookingRequestByIdUsecase {
  execute: (requestID: string) => Promise<Either<ErrorClass, BookingRequestEntity>>;
}

export class GetBookingRequestById implements GetBookingRequestByIdUsecase {
  private readonly bookingRequestRepository: BookingRequestRepository; // Change to BookingRequestRepository

  constructor(bookingRequestRepository: BookingRequestRepository) {
    this.bookingRequestRepository = bookingRequestRepository;
  }

  async execute(requestID: string): Promise<Either<ErrorClass, BookingRequestEntity>> {
    return await this.bookingRequestRepository.getBookingRequestById(requestID); // Change to getBookingRequestById
  }
}
