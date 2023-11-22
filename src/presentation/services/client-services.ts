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
import { loggerService } from "@presentation/routes/logger-routes";
import { logTime } from "@presentation/utils/logs-time-format";
import { formatTimeAmPm } from "@presentation/utils/time-format-am-pm";

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
    updateClientUsecases: UpdateClientUsecase
  ) {
    this.createClientUsecases = createClientUsecases;
    this.deleteClientUsecases = deleteClientUsecases;
    this.getClientByIdUsecases = getClientByIdUsecases;
    this.getAllClientsUsecases = getAllClientsUsecases;
    this.updateClientUsecases = updateClientUsecases;
  }

  async createClient(req: Request, res: Response): Promise<void> {
    const user = req.user;
    const outletId=req.outletId
    const newClientData = {
      ...req.body,
      outletId:outletId,
      createdBy: user._id,
      updatedBy: user._id,
    };
    const clientData: ClientModel = ClientMapper.toModel(newClientData);
    const newClient: Either<ErrorClass, ClientEntity> =
      await this.createClientUsecases.execute(clientData);
    newClient.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: ClientEntity) => {
        const resData = ClientMapper.toEntity(result, true);

        const time = formatTimeAmPm(resData.createdAt.toString().slice(16, 25));


        //  keeping logs in DB 

        const log = loggerService.createLogs(
          {
           level: 'info',
           timestamp: `${logTime()}`, 
           message: `${user.firstName} added this client at ${time}`,
           client: resData._id
          }
          )


        return res.status(201).json(resData);
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
        return res.status(204).json({ message: "Client deleted successfully." });
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
          return res.status(404).json({ message: "Data Not Found" });
        }
        const resData = ClientMapper.toEntity(result);
        return res.status(200).json(resData);
      }
    );
  }

  async getAllClients(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const outletId=req.outletId as string
    const clients: Either<ErrorClass, ClientEntity[]> =
      await this.getAllClientsUsecases.execute(outletId);

    clients.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: ClientEntity[]) => {
        const {
          vip,
          visits,
          lastvisits,
          birthdate,
          gender,
          ratings,
          contactinfo,
          venue,
          sort,
          search,
        } = req.query;

        let responseData = result.map((client) =>
          ClientMapper.toEntity(client)
        );

        if (visits && typeof visits === "string") {
          responseData = responseData.filter((item) => {
            if (visits === "1") {
              return item.visits === 1;
            }
            if (visits === "1-10" || visits === "gt1,lte10") {
              return item.visits > 1 && item.visits <= 10;
            }
            if (visits === "10+" || visits === ">10" || visits === "gt10") {
              return item.visits > 10;
            }
            return false;
          });
        }

        if (birthdate && typeof birthdate === "string") {
          responseData = responseData.filter(
            (item) => item.birthDate === birthdate
          );
        }

        if (gender && typeof gender === "string") {
          responseData = responseData.filter(
            (item) =>
              item.gender.toLocaleLowerCase() === gender.toLocaleLowerCase()
          );
        }

        if (contactinfo && typeof contactinfo === "string") {
          responseData = responseData.filter((item) => {
            if (contactinfo === "hasphone" || contactinfo === "nophone") {
              return contactinfo === "hasphone"
                ? item.phone !== (null || "")
                : item.phone === (null || "");
            } else if (
              contactinfo === "hasemail" ||
              contactinfo === "noemail"
            ) {
              return contactinfo === "hasemail"
                ? item.email !== (null || "")
                : item.email === (null || "");
            } else if (
              contactinfo === "hasemailphone" ||
              contactinfo === "noemailphone"
            ) {
              return contactinfo === "hasemailphone"
                ? item.email && item.phone !== (null || "")
                : !(item.email && item.phone !== (null || ""));
            } else {
              return true; // No filter applied if contactinfo is not recognized
            }
          });
        }

        responseData.sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();

          return sort === "1" ? dateB - dateA : dateA - dateB;
        });
 
        // Search
        if (search && typeof search === "string") {
          const regex = new RegExp(search, "i");
          responseData = responseData.filter((item) => {
            return (
              regex.test(item.firstName) ||
              regex.test(item.lastName) ||
              regex.test(item.email)
            );
          });
        }

        return res.status(200).json(responseData);
      }
    );
  }

  async updateClient(req: Request, res: Response): Promise<void> {
    const clientId: string = req.params.clientId;
    const user = req.user;
    const newClientData = {
      ...req.body,
      updatedBy: user._id,
    };
    const clientData: ClientModel = newClientData;
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
          async (result: ClientEntity) => {
            const resData = ClientMapper.toEntity(result, true);



            const log = loggerService.createLogs(
              {
               level: 'info',
               timestamp: `${logTime()}`, 
               message: `${user.firstName} updated this client `,
               client: resData._id
              }
              );

            res.status(200).json(resData);
          }
        );
      }
    );
  }
}
