import { Either } from "monet";
import { UserEntity, UserModel } from "../entities/user-account";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { UserRepository } from "../repositories/user-repository";

export interface CreateUserUsecase {
    execute: (
      userData: UserModel) => Promise<Either<ErrorClass, UserEntity>>;
  }
  
  export class CreateUser implements CreateUserUsecase {
    private readonly userRepository: UserRepository;
  
    constructor(userRepository: UserRepository) {
      this.userRepository = userRepository;
    }
  
    async execute(userData: UserModel): Promise<Either<ErrorClass, UserEntity>> {
      return await this.userRepository.createUser(userData);
    }
  }