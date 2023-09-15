import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { UserEntity } from "../entities/user-account";
import { UserRepository } from "../repositories/user-repository";

export interface GetAllUserUseCase {
    execute: () => Promise<Either<ErrorClass, UserEntity[]>>;
  }
  
  export class GetAllUsers implements GetAllUserUseCase {
    private readonly userRepository: UserRepository;
  
    constructor(userRepository: UserRepository) {
      this.userRepository = userRepository;
    }
  
    async execute(): Promise<Either<ErrorClass, UserEntity[]>> {
      return await this.userRepository.getAllUser();
    }
  }
  