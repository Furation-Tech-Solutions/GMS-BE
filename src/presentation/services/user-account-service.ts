import { UserLoginModel, UserEntity, UserMapper, UserModel } from "@domain/user-account/entities/user-account";
import { CreateUserUsecase } from "@domain/user-account/usecases/create-user";
import { DeleteUserUseCase } from "@domain/user-account/usecases/delete-user";
import { GetUserByEmailUseCase } from "@domain/user-account/usecases/login-user";
import { GetUserByIdUseCase } from "@domain/user-account/usecases/get-user-by-id";
import { GetAllUserUseCase } from "@domain/user-account/usecases/get-users";
import { UpdateUserUseCase } from "@domain/user-account/usecases/update-user";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { NextFunction, Request, Response } from "express";
import { Either } from "monet";
import { LogoutUserUseCase } from "@domain/user-account/usecases/logout-user";
import EmailService from "./send-mail";
import { registrationEmailTemplate } from "./email-template";
import EmailHandler from "@presentation/nodemailer/configuration/mail-handler";




export class UserService{
    private readonly createUserUseCase:CreateUserUsecase;
    private readonly getAllUserUseCase:GetAllUserUseCase;
    private readonly deleteUserUseCase:DeleteUserUseCase;
    private readonly getUserByIdUseCase:GetUserByIdUseCase;
    private readonly updateUserUseCase:UpdateUserUseCase;
    private readonly getUserByEmailUseCase:GetUserByEmailUseCase;
    private readonly logoutUserUseCase:LogoutUserUseCase;
    private readonly emailService:EmailService;

    constructor(
        createUserUseCase:CreateUserUsecase,
        getAllUserUseCase:GetAllUserUseCase,
        deleteUserUseCase:DeleteUserUseCase,
        getUserByIdUseCase:GetUserByIdUseCase,
        updateUserUseCase:UpdateUserUseCase,
        getUserByEmailUseCase:GetUserByEmailUseCase,
        logoutUserUseCase:LogoutUserUseCase,
        emailService:EmailService
    ){
        this.createUserUseCase = createUserUseCase;
        this.getAllUserUseCase = getAllUserUseCase;
        this.deleteUserUseCase=deleteUserUseCase;
        this.getUserByIdUseCase=getUserByIdUseCase;
        this.updateUserUseCase=updateUserUseCase;
        this.getUserByEmailUseCase=getUserByEmailUseCase;
        this.logoutUserUseCase=logoutUserUseCase;
      this.emailService = emailService;

    }



async createUser(req: Request, res: Response): Promise<void> {
    
    const user=req.user;
    const outletId = req.outletId;
    let permissions: number[]=[]
    if (req.body.accessLevel === 'Superuser') {
      permissions = [101,102,103,104,105,106,107,108,109,110]
    } else if (req.body.accessLevel === 'Manager') {
      permissions = [201,202,203,204,205,206,207,208,209,210]
    } else if (req.body.accessLevel  === 'Sub-Manager') {
      permissions = [301,302,303,304,305,306,307]
    }
    
    const newUserData={
        ...req.body,
        permissions,
        outlet:[outletId],
        createdBy: user._id,
        updatedBy:user._id
    }

    const { randomPassword, ...userDataWithoutPassword } = newUserData;
    const userData: UserModel = UserMapper.toModel(userDataWithoutPassword);

    const newUser: Either<ErrorClass, UserEntity> =
      await this.createUserUseCase.execute(userData);


    newUser.cata(
      async(error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      
      async(result: UserEntity) => {
        const resData = UserMapper.toEntity(result, true);
        const emailhandler= new EmailHandler()
        await emailhandler.userEmailHandler(req.body)

        return res.status(201).json(resData);
      }
    );
  }

  async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    // Call the GetAllAdminsUsecase to get all admins
    const users: Either<ErrorClass, UserEntity[]> =
      await this.getAllUserUseCase.execute();

    users.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (users: UserEntity[]) => {
        const resData = users.map((user) => UserMapper.toEntity(user));
        return res.status(200).json(resData);
      }
    );
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    const userID: string = req.params.userId;

    const deletedUser: Either<ErrorClass, void> =
        await this.deleteUserUseCase.execute(userID);

        deletedUser.cata(
        (error: ErrorClass) =>
            res.status(error.status).json({ error: error.message }),
        (result: void) => {

            return res.status(204).json({ message: "user deleted successfully." });
        }
    );
}
async getUserById(req: Request, res: Response): Promise<void> {
  const UserID: string = req.params.userId;
  const user: Either<ErrorClass, UserEntity> =
      await this.getUserByIdUseCase.execute(UserID);

  user.cata(
      (error: ErrorClass) =>{
      // console.log("error in get by id",error);
      
          res.status(error.status).json({ error: error.message })
      },
      (result: UserEntity) => {
          if (result == undefined) {
              return res.status(404).json({ message: "Data Not Found" });
          }
          const resData = UserMapper.toEntity(result);
          return res.status(200).json(resData);
      }
  );
}
async updateUser(req: Request, res: Response): Promise<void> {
  const UserID: string = req.params.userId;
  const user=req.user
    const newUserData={
        ...req.body,
        updatedBy:user._id
    }
  const userData: UserModel = newUserData;

  const existingUser: Either<ErrorClass, UserEntity> =
      await this.getUserByIdUseCase.execute(UserID);

  existingUser.cata(
      (error: ErrorClass) => {
        // console.log("error is this1",error)

          res.status(error.status).json({ error: error.message });
      },
      async (existingUserData: UserEntity) => {
          const updatedUserEntity: UserEntity = UserMapper.toEntity(
              userData,
              true,
              existingUserData
          );

          const updatedUser: Either<ErrorClass, UserEntity> =
              await this.updateUserUseCase.execute(
                  UserID,
                  updatedUserEntity
              );
              

              updatedUser.cata(
              (error: ErrorClass) => {
                // console.log("error is this",error)
                  res.status(error.status).json({ error: error.message });
              },
              (result: UserEntity) => {
                  const resData = UserMapper.toEntity(result, true);

                  res.status(200).json(resData);
              }
          );
      }
  );
}
async getUserByEmail(req: Request, res: Response): Promise<void> {
  const { email, firebaseToken } = req.body;

  const user: Either<ErrorClass, UserEntity> =
      await this.getUserByEmailUseCase.execute(email, firebaseToken);

      user.cata(
        (error: ErrorClass) =>{
        // console.log("error in get by email",error);
            res.status(error.status).json({ error: error.message })
        },
        (result: UserEntity) => {
            if (result == undefined) {
                return res.status(404).json({ message: "Data Not Found" });
            }
            const resData = UserMapper.toEntity(result);
            return res.status(200).cookie('email', resData.email).json(resData);
        }
    );
}

async logoutUser(req:Request,res:Response):Promise<void>{
  const userData=req.user
  const user: Either<ErrorClass, UserEntity> =
  await this.logoutUserUseCase.execute(userData.email);

  user.cata(
    (error: ErrorClass) =>{
    // console.log("error in get by email",error);
        res.status(error.status).json({ error: error.message })
    },
    (result: UserEntity) => {
        if (result == undefined) {
          // console.log(result,"result is this in service")
            return res.status(404).json({ message: "Data Not Found" });
        }
      
  //  console.log(user,"user in logout service")
  res.removeHeader('email');
  return  res.status(200)
        .cookie("email", null, {expires: new Date(Date.now()), httpOnly: true})
        .json({
            success: true,
            massage: "Logged Out",
        })
})
}
}