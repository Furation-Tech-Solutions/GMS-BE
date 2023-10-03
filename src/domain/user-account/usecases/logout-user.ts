import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { UserRepository } from "../repositories/user-repository";
import {  UserEntity, UserLoginModel } from "../entities/user-account";

export interface LogoutUserUseCase {
  execute: (email: string) => Promise<Either<ErrorClass, UserEntity>>;
}

export class LogoutUser implements LogoutUserUseCase {
  private readonly userRepository: UserRepository; // Change to BookingRequestRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  async execute(email: string): Promise<Either<ErrorClass, UserEntity>> {
    return await this.userRepository.logoutUser(email); // Change to getBookingRequestById

  }
}
