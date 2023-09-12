import { AccessLevelEntity, AccessLevelMapper, AccessLevelModel } from "@domain/access-level/entities/access-level";
import { CreateAccessLevelUsecase } from "@domain/access-level/usecases/create-acces-level";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { NextFunction, Request, Response } from "express";
import { GetAllAccessLevelUseCase } from "@domain/access-level/usecases/get-all-access-level";
import { DeleteAccessLevelUsecase } from "@domain/access-level/usecases/delete-access-level";
import { GetAccessLevelByIdUseCase } from "@domain/access-level/usecases/get-access-level-by-id";


export class AccessLevelService{
    private readonly createAccessLevelUseCase:CreateAccessLevelUsecase;
    private readonly getAccessLevelUseCase:GetAllAccessLevelUseCase;
    private readonly deleteAccessLevelUseCase:DeleteAccessLevelUsecase;
    private readonly getAccessLevelByIdUseCase:GetAccessLevelByIdUseCase;

    constructor(
        createAccessLevelUseCase:CreateAccessLevelUsecase,
        getAccessLevelUseCase:GetAllAccessLevelUseCase,
        deleteAccessLevelUseCase:DeleteAccessLevelUsecase,
        getAccessLevelByIdUseCase:GetAccessLevelByIdUseCase
    ){
        this.createAccessLevelUseCase = createAccessLevelUseCase;
        this.getAccessLevelUseCase=getAccessLevelUseCase;
        this.deleteAccessLevelUseCase=deleteAccessLevelUseCase;
        this.getAccessLevelByIdUseCase=getAccessLevelByIdUseCase
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

    async getAccessLevel(
        req:Request,
        res:Response,
        next:NextFunction
        ):Promise<void>{
            const accessLevel : Either<ErrorClass,AccessLevelEntity[]>=
            await this.getAccessLevelUseCase.execute();
            accessLevel.cata(
                (error: ErrorClass) =>
                  res.status(error.status).json({ error: error.message }),
                (accessLevel: AccessLevelEntity[]) => {
                  const resData = accessLevel.map((role) => AccessLevelMapper.toEntity(role));
                  return res.json(resData);
                }
              );
        }

        async deleteAccessLevel(req: Request, res: Response): Promise<void> {
          const accessLevelID: string = req.params.accessLevelId;
  
          const deletedAccessLevel: Either<ErrorClass, void> =
              await this.deleteAccessLevelUseCase.execute(accessLevelID);
  
              deletedAccessLevel.cata(
              (error: ErrorClass) =>
                  res.status(error.status).json({ error: error.message }),
              (result: void) => {
  
                  return res.json({ message: "AccessLevel role deleted successfully." });
              }
          );
      }

      async getAccessLevelById(req: Request, res: Response): Promise<void> {
        const accessLevelID: string = req.params.accessLevelId;
        console.log(accessLevelID,"acccessLevel id")


        const accessLevel: Either<ErrorClass, AccessLevelEntity> =
            await this.getAccessLevelByIdUseCase.execute(accessLevelID);

            accessLevel.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: AccessLevelEntity) => {
                if (result == undefined) {
                    return res.json({ message: "Data Not Found" });
                }
                const resData = AccessLevelMapper.toEntity(result);
                return res.json(resData);
            }
        );
    }

}