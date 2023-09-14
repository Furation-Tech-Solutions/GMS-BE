import { AccessLevelSourceImpl } from "@data/access-level/datasources/access-level-data-sources";
import { AccessLevelRepositoryImpl } from "@data/access-level/repositories/access-level-repository-impl";
import { CreateAccessLevel } from "@domain/access-level/usecases/create-acces-level";
import { AccessLevelService } from "@presentation/services/access-level-service";
import { Router } from "express";
import mongoose from "mongoose";


const mongooseConnection = mongoose.connection;

const accessLevelDataSource=new AccessLevelSourceImpl(mongooseConnection)

const accessLevelRepository=new AccessLevelRepositoryImpl(accessLevelDataSource)

const createAccessLevelUseCase=new CreateAccessLevel(accessLevelRepository)

const accessLevelService=new AccessLevelService(
    createAccessLevelUseCase
)

export const accessLevelRouter=Router()

accessLevelRouter.post(
    "/create",
    accessLevelService.createAccessLevel.bind(accessLevelService)
)