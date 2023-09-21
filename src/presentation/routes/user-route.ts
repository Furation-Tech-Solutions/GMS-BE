import { UserDataSourceImpl } from "@data/user-account/datasources/user-account-data-source";
import { UserRepositoryImpl } from "@data/user-account/repositories/user-account-repository-impl";
import { CreateUser } from "@domain/user-account/usecases/create-user";
import { DeleteUser } from "@domain/user-account/usecases/delete-user";
import { GetUserByEmail } from "@domain/user-account/usecases/get-user-by-email";
import { GetUserById } from "@domain/user-account/usecases/get-user-by-id";
import { GetAllUsers } from "@domain/user-account/usecases/get-users";
import { UpdateUser } from "@domain/user-account/usecases/update-user";
import { validateUserAccountInputMiddleware } from "@presentation/middlewares/user-account/user-account-validation";
import { UserService } from "@presentation/services/user-account-service";
import { Router } from "express";
import mongoose from "mongoose";


const mongooseConnection = mongoose.connection;

const userDataSource=new UserDataSourceImpl(mongooseConnection)
const userRepository=new UserRepositoryImpl(userDataSource)

const createUserUseCase=new CreateUser(userRepository)
const getAllUserUseCase=new GetAllUsers(userRepository)
const deleteUserUseCase=new DeleteUser(userRepository)
const getUserByIdUseCase=new GetUserById(userRepository)
const updateUserUseCase=new UpdateUser(userRepository)
const getUserByEmailUseCase=new GetUserByEmail(userRepository)

const userService=new UserService(
    createUserUseCase,
    getAllUserUseCase,
    deleteUserUseCase,
    getUserByIdUseCase,
    updateUserUseCase,
    getUserByEmailUseCase
)

export const userRouter=Router()

userRouter.post(
    "/create",
    validateUserAccountInputMiddleware(false),
    userService.createUser.bind(userService)
)
userRouter.get(
    "/getAll",
    userService.getAllUsers.bind(userService)
)
userRouter.delete(
    "/delete/:userId",
    userService.deleteUser.bind(userService)
 )
 userRouter.get(
    "/get/:userId",
    userService.getUserById.bind(userService)
 )
 userRouter.put(
    "/update/:userId",
    validateUserAccountInputMiddleware(true),
    userService.updateUser.bind(userService)
);
userRouter.post(
    "/get/getByEmail",
userService.getUserByEmail.bind(userService)
)