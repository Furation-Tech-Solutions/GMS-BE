import { Either } from "monet";
import { BookingRequestEntity } from "../entities/bookingRequest_entities"; // Import the BookingRequestEntity
import { BookingRequestRepository } from "../repositories/bookingRequest-repo"; // Import the BookingRequestRepository
import { ErrorClass } from "@presentation/error-handling/api-error";

export interface GetAllBookingRequestsUsecase {
  execute: () => Promise<Either<ErrorClass, BookingRequestEntity[]>>;
}

export class GetAllBookingRequests implements GetAllBookingRequestsUsecase {
  private readonly bookingRequestRepository: BookingRequestRepository;
  constructor(bookingRequestRepository: BookingRequestRepository) {
    this.bookingRequestRepository = bookingRequestRepository;
  }

  async execute(): Promise<Either<ErrorClass, BookingRequestEntity[]>> {
    return await this.bookingRequestRepository.getAllBookingRequests();
  }
}
