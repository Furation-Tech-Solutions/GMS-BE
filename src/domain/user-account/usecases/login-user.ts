import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { UserRepository } from "../repositories/user-repository";
import {  UserEntity, UserLoginModel } from "../entities/user-account";

export interface GetUserByEmailUseCase {
  execute: (email: string, firebaseToken: string) => Promise<Either<ErrorClass, UserEntity>>;
}

export class GetUserByEmail implements GetUserByEmailUseCase {
  private readonly userRepository: UserRepository; // Change to BookingRequestRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  async execute(user: string, firebaseToken: string): Promise<Either<ErrorClass, UserEntity>> {
    return await this.userRepository.getUserByEmail(user, firebaseToken); // Change to getBookingRequestById

  }
}
