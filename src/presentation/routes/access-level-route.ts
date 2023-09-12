import { AccessLevelSourceImpl } from "@data/access-level/datasources/access-level-data-sources";
import { AccessLevelRepositoryImpl } from "@data/access-level/repositories/access-level-repository-impl";
import { CreateAccessLevel } from "@domain/access-level/usecases/create-acces-level";
import { DeleteAccessLevel } from "@domain/access-level/usecases/delete-access-level";
import { GetAccessLevelById } from "@domain/access-level/usecases/get-access-level-by-id";
import { GetAllAccessLevel } from "@domain/access-level/usecases/get-all-access-level";
import { UpdateAccessLevel } from "@domain/access-level/usecases/update-access-level";
import { AccessLevelService } from "@presentation/services/access-level-service";
import { Router } from "express";
import mongoose from "mongoose";


const mongooseConnection = mongoose.connection;

const accessLevelDataSource=new AccessLevelSourceImpl(mongooseConnection)

const accessLevelRepository=new AccessLevelRepositoryImpl(accessLevelDataSource)

const createAccessLevelUseCase=new CreateAccessLevel(accessLevelRepository)
const getAccessLevelUseCase=new GetAllAccessLevel(accessLevelRepository)
const deleteAccessLevelUseCase=new DeleteAccessLevel(accessLevelRepository)
const getAccessLevelByIdUseCase=new GetAccessLevelById(accessLevelRepository)
const updateAccessLevelUseCase=new UpdateAccessLevel(accessLevelRepository)

const accessLevelService=new AccessLevelService(
    createAccessLevelUseCase,
    getAccessLevelUseCase,
    deleteAccessLevelUseCase,
    getAccessLevelByIdUseCase,
    updateAccessLevelUseCase
    
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
 accessLevelRouter.delete(
    "/delete/:accessLevelId",
    accessLevelService.deleteAccessLevel.bind(accessLevelService)
 )
 accessLevelRouter.get(
    "/getById/:accessLevelId",
    accessLevelService.getAccessLevelById.bind(accessLevelService)
);
accessLevelRouter.put(
    "/update/:accessLevelId",
    accessLevelService.updateAccessLevel.bind(accessLevelService)
);
