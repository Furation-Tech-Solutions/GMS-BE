import { UserEntity, UserMapper, UserModel } from "@domain/user-account/entities/user-account";
import { CreateUserUsecase } from "@domain/user-account/usecases/create-user";
import { GetAllUserUseCase } from "@domain/user-account/usecases/get-users";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { NextFunction, Request, Response } from "express";
import { Either } from "monet";




export class UserService{
    private readonly createUserUseCase:CreateUserUsecase;
    private readonly getAllUserUseCase:GetAllUserUseCase;
    constructor(
        createUserUseCase:CreateUserUsecase,
        getAllUserUseCase:GetAllUserUseCase,
    ){
        this.createUserUseCase = createUserUseCase;
        this.getAllUserUseCase = getAllUserUseCase;
    }



async createUser(req: Request, res: Response): Promise<void> {
    const userData: UserModel = UserMapper.toModel(req.body);

    const newUser: Either<ErrorClass, UserEntity> =
      await this.createUserUseCase.execute(userData);

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
}