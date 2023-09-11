import { AccessLevelEntity, AccessLevelMapper, AccessLevelModel } from "@domain/access-level/entities/access-level";
import { CreateAccessLevelUsecase } from "@domain/access-level/usecases/create-acces-level";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { NextFunction, Request, Response } from "express";


export class AccessLevelService{
    private readonly createAccessLevelUseCase:CreateAccessLevelUsecase;
   
    constructor(
        createAccessLevelUseCase:CreateAccessLevelUsecase,
    ){
        this.createAccessLevelUseCase = createAccessLevelUseCase;
    }

    async createAccessLevel(req:Request,res:Response):Promise<void>{
        const accessLevelData:AccessLevelModel=AccessLevelMapper.toModel(req.body)

        const newAccessLevel : Either<ErrorClass,AccessLevelEntity>=
        await this.createAccessLevelUseCase.execute(accessLevelData)
        newAccessLevel.cata(
            (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: AccessLevelEntity) => {
        const resData = AccessLevelMapper.toEntity(result, true);
        return res.json(resData);
      }
        )
    }

}