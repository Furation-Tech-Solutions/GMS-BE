import { UserDataSourceImpl } from "@data/user-account/datasources/user-account-data-source";
import { UserRepositoryImpl } from "@data/user-account/repositories/user-account-repository-impl";
import { CreateUser } from "@domain/user-account/usecases/create-user";
import { GetAllUsers } from "@domain/user-account/usecases/get-users";
import { UserService } from "@presentation/services/user-account-service";
import { Router } from "express";
import mongoose from "mongoose";


const mongooseConnection = mongoose.connection;

const userDataSource=new UserDataSourceImpl(mongooseConnection)
const userRepository=new UserRepositoryImpl(userDataSource)

const createUserUseCase=new CreateUser(userRepository)
const getAllUserUseCase=new GetAllUsers(userRepository)

const userService=new UserService(
    createUserUseCase,
    getAllUserUseCase
)

export const userRouter=Router()

userRouter.post(
    "/create",
    userService.createUser.bind(userService)
)
userRouter.get(
    "/getAll",
    userService.getAllUsers.bind(userService)
)