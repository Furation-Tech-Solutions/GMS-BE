import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { UserRepository } from "../repositories/user-repository";
import { UserEmailModel, UserEntity } from "../entities/user-account";

export interface GetUserByEmailUseCase {
  execute: (user: UserEmailModel) => Promise<Either<ErrorClass, UserEntity>>;
}

export class GetUserByEmail implements GetUserByEmailUseCase {
  private readonly userRepository: UserRepository; // Change to BookingRequestRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  async execute(user: UserEmailModel): Promise<Either<ErrorClass, UserEntity>> {
    return await this.userRepository.getUserByEmail(user); // Change to getBookingRequestById

  }
}
