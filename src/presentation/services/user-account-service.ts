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




export class UserService{
    private readonly createUserUseCase:CreateUserUsecase;
    private readonly getAllUserUseCase:GetAllUserUseCase;
    private readonly deleteUserUseCase:DeleteUserUseCase;
    private readonly getUserByIdUseCase:GetUserByIdUseCase;
    private readonly updateUserUseCase:UpdateUserUseCase;
    private readonly getUserByEmailUseCase:GetUserByEmailUseCase;

    constructor(
        createUserUseCase:CreateUserUsecase,
        getAllUserUseCase:GetAllUserUseCase,
        deleteUserUseCase:DeleteUserUseCase,
        getUserByIdUseCase:GetUserByIdUseCase,
        updateUserUseCase:UpdateUserUseCase,
        getUserByEmailUseCase:GetUserByEmailUseCase,
    ){
        this.createUserUseCase = createUserUseCase;
        this.getAllUserUseCase = getAllUserUseCase;
        this.deleteUserUseCase=deleteUserUseCase;
        this.getUserByIdUseCase=getUserByIdUseCase;
        this.updateUserUseCase=updateUserUseCase;
        this.getUserByEmailUseCase=getUserByEmailUseCase;
    }



async createUser(req: Request, res: Response): Promise<void> {

    // console.log(req.body)
    const { randomPassword, ...userDataWithoutPassword } = req.body;
    const userData: UserModel = UserMapper.toModel(userDataWithoutPassword);

    const newUser: Either<ErrorClass, UserEntity> =
      await this.createUserUseCase.execute(userData,randomPassword);

    newUser.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: UserEntity) => {
        const resData = UserMapper.toEntity(result, true);
        return res.json(resData);
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
        return res.json(resData);
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

            return res.json({ message: "user deleted successfully." });
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
              return res.json({ message: "Data Not Found" });
          }
          const resData = UserMapper.toEntity(result);
          return res.json(resData);
      }
  );
}
async updateUser(req: Request, res: Response): Promise<void> {
  const UserID: string = req.params.userId;
  const userData: UserModel = req.body;

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
                console.log("error is this",error)
                  res.status(error.status).json({ error: error.message });
              },
              (result: UserEntity) => {
                  const resData = UserMapper.toEntity(result, true);
                  res.json(resData);
              }
          );
      }
  );
}
async getUserByEmail(req: Request, res: Response): Promise<void> {
  const userEmail: UserLoginModel = req.body;

  const user: Either<ErrorClass, UserEntity> =
      await this.getUserByEmailUseCase.execute(userEmail);

      user.cata(
        (error: ErrorClass) =>{
        // console.log("error in get by email",error);
        
            res.status(error.status).json({ error: error.message })
        },
        (result: UserEntity) => {
            if (result == undefined) {
                return res.json({ message: "Data Not Found" });
            }
            const resData = UserMapper.toEntity(result);
            return res.cookie('email', resData.email).json(resData);
        }
    );

}

async logoutUser(req:Request,res:Response):Promise<void>{

  res.status(200)
        .cookie("email", null, {expires: new Date(Date.now()), httpOnly: true})
        .json({
            success: true,
            massage: "Logged Out",
        })
}
}