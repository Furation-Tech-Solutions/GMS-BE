import { NextFunction, Request, Response } from "express";
import {
    ClientEntity,
    ClientMapper,
    ClientModel,
} from "@domain/client/entities/client_entities"; // Import client-related entities and mapper
import { CreateClientUsecase } from "@domain/client/usecases/create-client"; // Import client-related use cases
import { DeleteClientUsecase } from "@domain/client/usecases/delete-client";
import { GetClientByIdUsecase } from "@domain/client/usecases/get-clients-by-id";
import { GetAllClientsUsecase } from "@domain/client/usecases/get-all-client";
import { UpdateClientUsecase } from "@domain/client/usecases/update-client";
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";

export class ClientServices {
    private readonly createClientUsecases: CreateClientUsecase;
    private readonly deleteClientUsecases: DeleteClientUsecase;
    private readonly getClientByIdUsecases: GetClientByIdUsecase;
    private readonly getAllClientsUsecases: GetAllClientsUsecase;
    private readonly updateClientUsecases: UpdateClientUsecase;

    constructor(
        createClientUsecases: CreateClientUsecase,
        deleteClientUsecases: DeleteClientUsecase,
        getClientByIdUsecases: GetClientByIdUsecase,
        getAllClientsUsecases: GetAllClientsUsecase,
        updateClientUsecases: UpdateClientUsecase,
    ) {
        this.createClientUsecases = createClientUsecases;
        this.deleteClientUsecases = deleteClientUsecases;
        this.getClientByIdUsecases = getClientByIdUsecases;
        this.getAllClientsUsecases = getAllClientsUsecases;
        this.updateClientUsecases = updateClientUsecases;
    }

    async createClient(req: Request, res: Response): Promise<void> {
        const clientData: ClientModel = ClientMapper.toModel(req.body);

        const newClient: Either<ErrorClass, ClientEntity> =
            await this.createClientUsecases.execute(clientData);

        newClient.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: ClientEntity) => {
                const resData = ClientMapper.toEntity(result, true);
                return res.json(resData);
            }
        );
    }

    async deleteClient(req: Request, res: Response): Promise<void> {
        const clientID: string = req.params.clientId;

        const deletedClient: Either<ErrorClass, void> =
            await this.deleteClientUsecases.execute(clientID);

        deletedClient.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: void) => {

                return res.json({ message: "Client deleted successfully." });
            }
        );
    }

    async getClientById(req: Request, res: Response): Promise<void> {
        const clientId: string = req.params.clientId;

        const client: Either<ErrorClass, ClientEntity> =
            await this.getClientByIdUsecases.execute(clientId);

        client.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: ClientEntity) => {
                if (result == undefined) {
                    return res.json({ message: "Data Not Found" });
                }
                const resData = ClientMapper.toEntity(result);
                return res.json(resData);
            }
        );
    }

    async getAllClients(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const clients: Either<ErrorClass, ClientEntity[]> =
            await this.getAllClientsUsecases.execute();

        clients.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: ClientEntity[]) => {
                const responseData = result.map((client) =>
                    ClientMapper.toEntity(client)
                );
                return res.json(responseData);
            }
        );
    }

    async updateClient(req: Request, res: Response): Promise<void> {
        const clientId: string = req.params.clientId;
        const clientData: ClientModel = req.body;

        const existingClient: Either<ErrorClass, ClientEntity> =
            await this.getClientByIdUsecases.execute(clientId);

        existingClient.cata(
            (error: ErrorClass) => {
                res.status(error.status).json({ error: error.message });
            },
            async (existingClientData: ClientEntity) => {
                const updatedClientEntity: ClientEntity = ClientMapper.toEntity(
                    clientData,
                    true,
                    existingClientData
                );

                const updatedClient: Either<ErrorClass, ClientEntity> =
                    await this.updateClientUsecases.execute(
                        clientId,
                        updatedClientEntity
                    );

                updatedClient.cata(
                    (error: ErrorClass) => {
                        res.status(error.status).json({ error: error.message });
                    },
                    (result: ClientEntity) => {
                        const resData = ClientMapper.toEntity(result, true);
                        res.json(resData);
                    }
                );
            }
        );
    }
}
