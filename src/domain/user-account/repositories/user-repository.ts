import { Either } from "monet";
import { UserEntity, UserModel } from "../entities/user-account";
import { ErrorClass } from "@presentation/error-handling/api-error";

export interface UserRepository {
    createUser(user: UserModel): Promise<Either<ErrorClass, UserEntity>>;
    getAllUser(): Promise<Either<ErrorClass, UserEntity[]>>;

}   