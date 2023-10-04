import { Either } from "monet";
import { UserEntity, UserModel } from "../entities/user-account";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { UserRepository } from "../repositories/user-repository";
import EmailService from "@presentation/services/send-mail";
// import { SendEmailUsecase } from "./send-email-with-password";

export interface CreateUserUsecase {
    execute: ( userData: UserModel,password:string) => Promise<Either<ErrorClass, UserEntity>>;
  }
  
  export class CreateUser implements CreateUserUsecase {
    private readonly userRepository: UserRepository;
    // private readonly emailService:EmailService;
    // private readonly emailUseCase:SendEmailUsecase;
  
    constructor(userRepository: UserRepository) {
      this.userRepository = userRepository;
      // this.emailService = emailService;
      // this.emailUseCase=emailUseCase
    }
  
    async execute(userData: UserModel): Promise<Either<ErrorClass, UserEntity>> {
      const newUserResult=await this.userRepository.createUser(userData);

      // if (newUserResult.isRight()) {
      //   // If the user registration is successful, send a registration email
      //   try {
      //     // Use the EmailService to send the email
      //     await this.emailUseCase.execute(password,userData);
      //   } catch (error) {
      //     // Handle email sending errors here
      //     console.error('Error sending registration email:', error);
      //   }
      // }
  
      return newUserResult;
    }
  }