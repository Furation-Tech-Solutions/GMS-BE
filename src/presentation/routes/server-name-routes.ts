import { ServersNameDataSourceImpl } from "@data/servers-name/datasources/servers-name-data-source";
import { ServersNameRepositoryImpl } from "@data/servers-name/repositories/servers-name-repository-impl";
import { CreateServerName } from "@domain/servers-name/usecase/create-server-name"
import { DeleteServerName } from "@domain/servers-name/usecase/delete-server-name";
import { GetAllServersName } from "@domain/servers-name/usecase/get-all-server-name";
import { GetServerNameById } from "@domain/servers-name/usecase/get-server-name-by-id";
import { UpdateServerName } from "@domain/servers-name/usecase/update-server-name";
import { ServerNameService } from "@presentation/services/servers-name-services"
import { Router } from "express"
import mongoose from "mongoose";

const mongooseConnection = mongoose.connection;

const serverNameDataSource = new ServersNameDataSourceImpl(mongooseConnection);
const serverNameRepository = new ServersNameRepositoryImpl(serverNameDataSource);

const createServerNameUseCase = new CreateServerName(serverNameRepository)
const getAllServersNameUseCase=new GetAllServersName(serverNameRepository)
const getServerNameByIdUseCase = new GetServerNameById(serverNameRepository)
const UpdateServerNameUseCase = new UpdateServerName(serverNameRepository)
const deleteServerNameUseCase=new DeleteServerName(serverNameRepository)

const serverNameService=new ServerNameService(
    createServerNameUseCase,
    getAllServersNameUseCase,
    getServerNameByIdUseCase,
    UpdateServerNameUseCase,
    deleteServerNameUseCase,
)

export const serverNameRouter=Router()


serverNameRouter.post(
    "/addServerName",serverNameService.createServerName.bind(serverNameService)
)
serverNameRouter.get(
    "/getAllServerNames",serverNameService.getAllServersName.bind(serverNameService)
)
serverNameRouter.patch(
    "/update/:serverNameId",serverNameService.updateServerName.bind(serverNameService)
    )
serverNameRouter.delete(
    "/delete/:serverNameId",
    serverNameService.deleteServerName.bind(serverNameService)
  );