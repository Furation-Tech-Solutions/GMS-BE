import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { UserEntity } from "../entities/user-account";
import { UserRepository } from "../repositories/user-repository";

export interface UpdateUserUseCase {
  execute: (
    userID: string,
    userData: UserEntity
  ) => Promise<Either<ErrorClass, UserEntity>>;
}

export class UpdateUser implements UpdateUserUseCase {
  private readonly userRepository: UserRepository; // Change to BookingRequestRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(
    userID: string,
    userData: UserEntity
  ): Promise<Either<ErrorClass, UserEntity>> {
    return await this.userRepository.updateUser(userID, userData); // Change to updateBookingRequest
  }
}
