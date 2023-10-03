import {  UserEntity, UserLoginModel, UserModel } from "@domain/user-account/entities/user-account";
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
        let u = await this.dataSource.create(user);
        return Right<ErrorClass, UserEntity>(u);
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
      async deleteUser(id: string): Promise<Either<ErrorClass, void>> {
        // await this.dataSource.delete(id);
        try {
          const i = await this.dataSource.delete(id);
          return Right<ErrorClass, void>(i);
        } catch (e) {
          return Left<ErrorClass, void>(ApiError.badRequest());
        }
      }
      async getUserById(id: string): Promise<Either<ErrorClass, UserEntity>> {
        try {
            const request = await this.dataSource.read(id); // Use the booking request data source
            return request
                ? Right<ErrorClass, UserEntity>(request)
                : Left<ErrorClass, UserEntity>(ApiError.notFound());
        } catch (e) {
            if (e instanceof ApiError && e.name === "notfound") {
                return Left<ErrorClass, UserEntity>(ApiError.notFound());
            }
            return Left<ErrorClass, UserEntity>(ApiError.badRequest());
        }
    }
      
    async updateUser(id: string, data: UserModel): Promise<Either<ErrorClass, UserEntity>> {
      try {
          const updatedUser = await this.dataSource.update(id, data); // Use the booking request data source
          return Right<ErrorClass, UserEntity>(updatedUser);
      } catch (e) {
          if (e instanceof ApiError && e.name === "conflict" ) {
            console.log(e,"error in data source impl")
              return Left<ErrorClass, UserEntity>(ApiError.bookingRequestExists());
          }
          return Left<ErrorClass, UserEntity>(ApiError.badRequest());
      }
  }
  async getUserByEmail(email:string, firebaseToken: string): Promise<Either<ErrorClass, UserEntity>>{
    try{
      const request = await this.dataSource.userLogin(email, firebaseToken); // Use the booking request data source
      return request
          ? Right<ErrorClass, UserEntity>(request)
          : Left<ErrorClass, UserEntity>(ApiError.notFound());
    }
    catch(err){
      return Left<ErrorClass, UserEntity>(ApiError.badRequest());
    }
  }
  async logoutUser(email:string): Promise<Either<ErrorClass, UserEntity>>{
    try{
      const request = await this.dataSource.userLogout(email); // Use the booking request data source
      return request
          ? Right<ErrorClass, UserEntity>(request)
          : Left<ErrorClass, UserEntity>(ApiError.notFound());
    }
    catch(err){
      return Left<ErrorClass, UserEntity>(ApiError.badRequest());
    }
  }
  
    }