import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { UserRepository } from "../repositories/user-repository";
import { UserEntity } from "../entities/user-account";

export interface GetUserByIdUseCase {
  execute: (BookingRequestID: string) => Promise<Either<ErrorClass, UserEntity>>;
}

export class GetUserById implements GetUserByIdUseCase {
  private readonly userRepository: UserRepository; // Change to BookingRequestRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  async execute(userID: string): Promise<Either<ErrorClass, UserEntity>> {
    return await this.userRepository.getUserById(userID); // Change to getBookingRequestById

  }
}
