import { AccessLevelSourceImpl } from "@data/access-level/datasources/access-level-data-sources";
import { AccessLevelRepositoryImpl } from "@data/access-level/repositories/access-level-repository-impl";
import { CreateAccessLevel } from "@domain/access-level/usecases/create-acces-level";
import { GetAllAccessLevel } from "@domain/access-level/usecases/get-all-access-level";
import { AccessLevelService } from "@presentation/services/access-level-service";
import { Router } from "express";
import mongoose from "mongoose";


const mongooseConnection = mongoose.connection;

const accessLevelDataSource=new AccessLevelSourceImpl(mongooseConnection)

const accessLevelRepository=new AccessLevelRepositoryImpl(accessLevelDataSource)

const createAccessLevelUseCase=new CreateAccessLevel(accessLevelRepository)
const getAccessLevelUseCase=new GetAllAccessLevel(accessLevelRepository)

const accessLevelService=new AccessLevelService(
    createAccessLevelUseCase,
    getAccessLevelUseCase
    
)

export const accessLevelRouter=Router()

accessLevelRouter.post(
    "/create",
    accessLevelService.createAccessLevel.bind(accessLevelService)
)
accessLevelRouter.get(
    "/getAll",
    accessLevelService.getAccessLevel.bind(accessLevelService)
 );
