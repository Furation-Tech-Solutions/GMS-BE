import { Either } from "monet";
import {  UserEntity, UserLoginModel, UserModel } from "../entities/user-account";
import { ErrorClass } from "@presentation/error-handling/api-error";

export interface UserRepository {
    createUser(user: UserModel): Promise<Either<ErrorClass, UserEntity>>;
    getAllUser(): Promise<Either<ErrorClass, UserEntity[]>>;
    deleteUser(id: string): Promise<Either<ErrorClass, void>> ;
    getUserById(id: string): Promise<Either<ErrorClass, UserEntity>>;
    updateUser(
        id: string,
        data: UserModel
    ): Promise<Either<ErrorClass, UserEntity>>;
    getUserByEmail(email: UserLoginModel): Promise<Either<ErrorClass, UserEntity>>
}   