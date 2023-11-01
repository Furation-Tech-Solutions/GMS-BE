import { ServersNameDataSourceImpl } from "@data/servers-name/datasources/servers-name-data-source";
import { ServersNameRepositoryImpl } from "@data/servers-name/repositories/servers-name-repository-impl";
import { CreateServerName } from "@domain/servers-name/usecase/create-server-name"
import { DeleteServerName } from "@domain/servers-name/usecase/delete-server-name";
import { GetAllServersName } from "@domain/servers-name/usecase/get-all-server-name";
import { GetServerNameById } from "@domain/servers-name/usecase/get-server-name-by-id";
import { UpdateServerName } from "@domain/servers-name/usecase/update-server-name";
import { verifyLoggedInUser } from "@presentation/middlewares/auth-middleware";
import { validateServersNameInputMiddleware } from "@presentation/middlewares/servers-name/servers-name-validation";
import { verifyOutlet } from "@presentation/outlet-middleware/outlet-middleware";
import { ServerNameService } from "@presentation/services/servers-name-services"
import { Router } from "express"
import mongoose from "mongoose";

const mongooseConnection = mongoose.connection;

const serverNameDataSource = new ServersNameDataSourceImpl(mongooseConnection);
const serverNameRepository = new ServersNameRepositoryImpl(serverNameDataSource);

const createServerNameUseCase = new CreateServerName(serverNameRepository)
const getAllServersNameUseCase = new GetAllServersName(serverNameRepository)
const getServerNameByIdUseCase = new GetServerNameById(serverNameRepository)
const UpdateServerNameUseCase = new UpdateServerName(serverNameRepository)
const deleteServerNameUseCase = new DeleteServerName(serverNameRepository)

const serverNameService = new ServerNameService(
    createServerNameUseCase,
    getAllServersNameUseCase,
    getServerNameByIdUseCase,
    UpdateServerNameUseCase,
    deleteServerNameUseCase,
)

export const serverNameRouter = Router()


serverNameRouter.post(
    "/addServerName",
    verifyLoggedInUser,
    verifyOutlet,
    validateServersNameInputMiddleware(false),
    serverNameService.createServerName.bind(serverNameService)
)
serverNameRouter.get(
    "/getAllServerNames",verifyLoggedInUser,verifyOutlet, serverNameService.getAllServersName.bind(serverNameService)
)
serverNameRouter.patch(
    "/update/:serverNameId",
    validateServersNameInputMiddleware(true),
    verifyLoggedInUser,
    serverNameService.updateServerName.bind(serverNameService)
)
serverNameRouter.delete(
    "/delete/:serverNameId",
    verifyLoggedInUser,
    serverNameService.deleteServerName.bind(serverNameService)
);