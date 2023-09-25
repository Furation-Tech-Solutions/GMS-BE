import { Either } from "monet";
import { UserEntity, UserModel } from "../entities/user-account";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { UserRepository } from "../repositories/user-repository";
import EmailService from "@presentation/services/send-mail";

export interface CreateUserUsecase {
    execute: ( userData: UserModel,password:string) => Promise<Either<ErrorClass, UserEntity>>;
  }
  
  export class CreateUser implements CreateUserUsecase {
    private readonly userRepository: UserRepository;
    private readonly emailService:EmailService;
  
    constructor(userRepository: UserRepository,emailService: EmailService) {
      this.userRepository = userRepository;
      this.emailService = emailService;
    }
  
    async execute(userData: UserModel,password:string): Promise<Either<ErrorClass, UserEntity>> {
      const newUserResult=await this.userRepository.createUser(userData);

      if (newUserResult.isRight()) {
        // If the user registration is successful, send a registration email
        const newUser = newUserResult.right();
        //  const password=Date.now()

        // const registrationEmailOptions = {
        //   email: newUser.email,
        //   subject: 'Welcome to [Website/Application Name] - Your Registration Details',
        //   message: ` Dear ${newUser.firstName},

        //   Welcome to Akina! We're excited to have you as a new member of our community. Thank you for choosing to register with us.
      
        //   Below are your registration details:
      
        //   Username/Email: ${newUser.email}
        //   Password: ${password}
      
        //   Please keep this email in a safe place and do not share your password with anyone. For security reasons, we recommend changing your password as soon as you log in for the first time. You can do this by following these steps:
      
        //   1. Visit [Website URL] at [Website URL].
        //   2. Click on the "Log In" or "Sign In" button.
        //   3. Enter your registered email address and the temporary password provided above.
        //   4. You will be prompted to create a new, secure password of your choice. Make sure it's unique and not easily guessable.
      
        //   If you have any questions or need assistance, please don't hesitate to reach out to our support team at [Support Email Address]. We're here to help.
      
        //   Thank you again for joining Akina. We look forward to providing you with a great experience on our platform.
      
        //   Best regards,
        //   The Akina Team`,
        // };
  
        // try {
        //   // Use the EmailService to send the email
        //   await this.emailService.sendEmail(registrationEmailOptions);
        // } catch (error) {
        //   // Handle email sending errors here
        //   console.error('Error sending registration email:', error);
        // }
      }
  
      return newUserResult;
    }
  }