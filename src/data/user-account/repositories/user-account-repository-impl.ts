import { UserEntity, UserModel } from "@domain/user-account/entities/user-account";
import { UserDataSource } from "../datasources/user-account-data-source";
import { Either, Left, Right } from "monet";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { UserRepository } from "@domain/user-account/repositories/user-repository";


export class UserRepositoryImpl implements UserRepository {
    private readonly dataSource: UserDataSource;
  
    constructor(dataSource: UserDataSource) {
      this.dataSource = dataSource;
    }
  
    async createUser(
      user: UserModel
    ): Promise<Either<ErrorClass, UserEntity>> {
      try {
        let i = await this.dataSource.create(user);
        return Right<ErrorClass, UserEntity>(i);
      } catch (e) {
        if (typeof ApiError.emailExist) {
          return Left<ErrorClass, UserEntity>(ApiError.emailExist());
        }
        return Left<ErrorClass, UserEntity>(ApiError.badRequest());
      }
     }
     async getAllUser(): Promise<Either<ErrorClass, UserEntity[]>> {
        try {
          const response = await this.dataSource.getAllUsers();
          return Right<ErrorClass, UserEntity[]>(response);
        } catch (error) {
          if (error instanceof ApiError && error.status === 409) {
            return Left<ErrorClass, UserEntity[]>(ApiError.emailExist());
          }
          return Left<ErrorClass, UserEntity[]>(ApiError.badRequest());
        }
      }
    }