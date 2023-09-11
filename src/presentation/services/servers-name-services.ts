import { ServersNameEntity, ServersNameMapper, ServersNameModel } from "@domain/servers-name/entities/servers-name";
import { CreateServerNameUseCase } from "@domain/servers-name/usecase/create-server-name";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { NextFunction, Request, Response } from "express";
import { GetAllServersNameUseCase } from "@domain/servers-name/usecase/get-all-server-name";
import { DeleteServerNameUseCase } from "@domain/servers-name/usecase/delete-server-name";
import { GetServerNameByIdUsecase } from "@domain/servers-name/usecase/get-server-name-by-id";
import { UpdateServerNameUseCase } from "@domain/servers-name/usecase/update-server-name";



export class ServerNameService{
    private readonly createServerNameUseCase:CreateServerNameUseCase;
    private readonly getAllServerNameUseCase:GetAllServersNameUseCase;
    private readonly getServerNameByIdUsecase:GetServerNameByIdUsecase;
    private readonly updateServerNameUseCase:UpdateServerNameUseCase;
    private readonly deleteServerNameUseCase:DeleteServerNameUseCase;

    constructor(
        createServerNameUseCase:CreateServerNameUseCase,
        getAllServerNameUseCase:GetAllServersNameUseCase,
        getServerNameByIdUsecase:GetServerNameByIdUsecase,
        updateServerNameUseCase:UpdateServerNameUseCase,
        deleteServerNameUseCase:DeleteServerNameUseCase
    ){
        this.createServerNameUseCase = createServerNameUseCase;
        this.getAllServerNameUseCase=getAllServerNameUseCase;
        this.getServerNameByIdUsecase=getServerNameByIdUsecase;
        this.updateServerNameUseCase=updateServerNameUseCase;
        this.deleteServerNameUseCase=deleteServerNameUseCase
    }

    async createServerName(req:Request, res:Response):Promise<void>{
        const serverNameData: ServersNameModel = ServersNameMapper.toModel(req.body);
    
        const newServerName: Either<ErrorClass, ServersNameEntity> =
          await this.createServerNameUseCase.execute(serverNameData);
    
          newServerName.cata(
          (error: ErrorClass) =>
            res.status(error.status).json({ error: error.message }),
          (result: ServersNameEntity) => {
            const resData = ServersNameMapper.toEntity(result, true);
            return res.json(resData);
          }
        );
    }
    async getAllServersName(
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> {
        // Call the GetAllAdminsUsecase to get all admins
        console.log("inside service")
        const serverName: Either<ErrorClass, ServersNameEntity[]> =
          await this.getAllServerNameUseCase.execute();
          console.log(serverName,"serverName","service")
    
          serverName.cata(
          (error: ErrorClass) =>
            res.status(error.status).json({ error: error.message }),
          (serverNameList: ServersNameEntity[]) => {
            const resData = serverNameList.map((serverName) => ServersNameMapper.toEntity(serverName));
            return res.json(resData);
          }
        );
      }
      async updateServerName(req: Request, res: Response): Promise<void> {
        
        const nameId: string = req.params.nameId;
        const nameData: ServersNameModel = req.body;
  
        // Get the existing admin by ID
        const existingName: Either<ErrorClass,ServersNameEntity > | null =
          await this.getServerNameByIdUsecase.execute(nameId);
  
          existingName.cata(
              (error: ErrorClass) => {
                res.status(error.status).json({ error: error.message });
              },
              async (result: ServersNameEntity) => {
                const resData = ServersNameMapper.toEntity(result, true);
                const updatedServerNameEntity: ServersNameEntity = ServersNameMapper.toEntity(
                  nameData,
                  true,
                  resData
                );
              
          

          const updatedServerName: Either<ErrorClass, ServersNameEntity> =
          await this.updateServerNameUseCase.execute(nameId, updatedServerNameEntity);

          updatedServerName.cata(
          (error: ErrorClass) => {
            res.status(error.status).json({ error: error.message });
          },
          (response: ServersNameEntity) => {
            // Convert updatedAdmin from AdminEntity to plain JSON object using AdminMapper
            const responseData = ServersNameMapper.toModel(response);

            // Send the updated admin as a JSON response
            res.json(responseData);
          }
        );
      }
          )
      }
      
      async deleteServerName(req:Request,res:Response):Promise<void>{
        const serverNameId:string=req.params.serverNameId
        console.log(serverNameId,'serverNameId')

        const deleteServerName = await this.deleteServerNameUseCase.execute(serverNameId);

        deleteServerName.cata(
          (error: ErrorClass) =>
            res.status(error.status).json({ error: error.message }),

          (result: void) => {
            const resData = "Deleted successfully";
            console.log(resData)
            return res.json(resData);
          }
        );

      
   }
}