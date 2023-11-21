

import { NextFunction, Request, Response } from "express";

import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { CreateLoggerUsecase } from "@domain/logger/usecases/create-logger-usecase";
import { LoggerEntity, LoggerMapper, LoggerModel } from "@domain/logger/entities/logger-entity";
import { ILoggerData, IlogsFilter } from "types/logger/logger-schema-type";
import { GetAllLogsUsecase } from "@domain/logger/usecases/get-all-logs-usecase";

export class LoggerServices {
  private readonly createLoggerUsecase: CreateLoggerUsecase;
    private readonly getAllLogsUsecase: GetAllLogsUsecase;
//   private readonly deleteClientUsecases: DeleteClientUsecase;
//   private readonly getClientByIdUsecases: GetClientByIdUsecase;
//   private readonly updateClientUsecases: UpdateClientUsecase;

  constructor(
    createLoggerUsecase: CreateLoggerUsecase,
    getAllLogsUsecase: GetAllLogsUsecase,
    // deleteClientUsecases: DeleteClientUsecase,
    // getClientByIdUsecases: GetClientByIdUsecase,
    // updateClientUsecases: UpdateClientUsecase
  ) {
    this.createLoggerUsecase = createLoggerUsecase;
    this.getAllLogsUsecase = getAllLogsUsecase;
    // this.deleteClientUsecases = deleteClientUsecases;
    // this.getClientByIdUsecases = getClientByIdUsecases;
    // this.updateClientUsecases = updateClientUsecases;
  }

  async  createLogs(loggerData: ILoggerData): Promise<any> {
 
    const newlogs: Either<ErrorClass, LoggerEntity> =
      await this.createLoggerUsecase.execute(loggerData);

      newlogs.fold(
        (error: ErrorClass) => {
          console.error(error);
        },
        (result: LoggerEntity) => {
          console.log(result); 
          return result;
        }
      );

      return 
   
  }

//   async deleteClient(req: Request, res: Response): Promise<void> {
//     const clientID: string = req.params.clientId;

//     const deletedClient: Either<ErrorClass, void> =
//       await this.deleteClientUsecases.execute(clientID);

//     deletedClient.cata(
//       (error: ErrorClass) =>
//         res.status(error.status).json({ error: error.message }),
//       (result: void) => {
//         return res.status(200).json({ message: "Client deleted successfully." });
//       }
//     );
//   }

//   async getClientById(req: Request, res: Response): Promise<void> {
//     const clientId: string = req.params.clientId;

//     const client: Either<ErrorClass, ClientEntity> =
//       await this.getClientByIdUsecases.execute(clientId);

//     client.cata(
//       (error: ErrorClass) =>
//         res.status(error.status).json({ error: error.message }),
//       (result: ClientEntity) => {
//         if (result == undefined) {
//           return res.status(404).json({ message: "Data Not Found" });
//         }
//         const resData = ClientMapper.toEntity(result);
//         return res.status(200).json(resData);
//       }
//     );
//   }

//   async getAllClients(
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<void> {
//     const outletId=req.outletId as string
//     const clients: Either<ErrorClass, ClientEntity[]> =
//       await this.getAllClientsUsecases.execute(outletId);

//     clients.cata(
//       (error: ErrorClass) =>
//         res.status(error.status).json({ error: error.message }),
//       (result: ClientEntity[]) => {
//         const {
//           vip,
//           visits,
//           lastvisits,
//           birthdate,
//           gender,
//           ratings,
//           contactinfo,
//           venue,
//           sort,
//           search,
//         } = req.query;

//         let responseData = result.map((client) =>
//           ClientMapper.toEntity(client)
//         );

//         if (visits && typeof visits === "string") {
//           responseData = responseData.filter((item) => {
//             if (visits === "1") {
//               return item.visits === 1;
//             }
//             if (visits === "1-10" || visits === "gt1,lte10") {
//               return item.visits > 1 && item.visits <= 10;
//             }
//             if (visits === "10+" || visits === ">10" || visits === "gt10") {
//               return item.visits > 10;
//             }
//             return false;
//           });
//         }

//         if (birthdate && typeof birthdate === "string") {
//           responseData = responseData.filter(
//             (item) => item.birthDate === birthdate
//           );
//         }

//         if (gender && typeof gender === "string") {
//           responseData = responseData.filter(
//             (item) =>
//               item.gender.toLocaleLowerCase() === gender.toLocaleLowerCase()
//           );
//         }

//         if (contactinfo && typeof contactinfo === "string") {
//           responseData = responseData.filter((item) => {
//             if (contactinfo === "hasphone" || contactinfo === "nophone") {
//               return contactinfo === "hasphone"
//                 ? item.phone !== (null || "")
//                 : item.phone === (null || "");
//             } else if (
//               contactinfo === "hasemail" ||
//               contactinfo === "noemail"
//             ) {
//               return contactinfo === "hasemail"
//                 ? item.email !== (null || "")
//                 : item.email === (null || "");
//             } else if (
//               contactinfo === "hasemailphone" ||
//               contactinfo === "noemailphone"
//             ) {
//               return contactinfo === "hasemailphone"
//                 ? item.email && item.phone !== (null || "")
//                 : !(item.email && item.phone !== (null || ""));
//             } else {
//               return true; // No filter applied if contactinfo is not recognized
//             }
//           });
//         }

//         responseData.sort((a, b) => {
//           const dateA = new Date(a.createdAt).getTime();
//           const dateB = new Date(b.createdAt).getTime();

//           return sort === "1" ? dateB - dateA : dateA - dateB;
//         });

//         // Search
//         if (search && typeof search === "string") {
//           const regex = new RegExp(search, "i");
//           responseData = responseData.filter((item) => {
//             return (
//               regex.test(item.firstName) ||
//               regex.test(item.lastName) ||
//               regex.test(item.email)
//             );
//           });
//         }

//         return res.status(200).json(responseData);
//       }
//     );
//   }

//   async updateClient(req: Request, res: Response): Promise<void> {
//     const clientId: string = req.params.clientId;
//     const user = req.user;
//     const newClientData = {
//       ...req.body,
//       updatedBy: user._id,
//     };
//     const clientData: ClientModel = newClientData;
//     const existingClient: Either<ErrorClass, ClientEntity> =
//       await this.getClientByIdUsecases.execute(clientId);
//     existingClient.cata(
//       (error: ErrorClass) => {
//         res.status(error.status).json({ error: error.message });
//       },
//       async (existingClientData: ClientEntity) => {
//         const updatedClientEntity: ClientEntity = ClientMapper.toEntity(
//           clientData,
//           true,
//           existingClientData
//         );
//         const updatedClient: Either<ErrorClass, ClientEntity> =
//           await this.updateClientUsecases.execute(
//             clientId,
//             updatedClientEntity
//           );

//         updatedClient.cata(
//           (error: ErrorClass) => {
//             res.status(error.status).json({ error: error.message });
//           },
//           (result: ClientEntity) => {
//             const resData = ClientMapper.toEntity(result, true);
//             res.status(200).json(resData);
//           }
//         );
//       }
//     );
//   }

async getAlllogs(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    const reservationId = req.query.reservation as string;
    const clientId = req.query.client as string;

    const filter: IlogsFilter = {}

    if(clientId ) {
        filter.client = clientId
    }

    if(reservationId ) {
        filter.reservation = reservationId
    }

    // Call the GetAllAdminsUsecase to get all admins
    const allLogs: Either<ErrorClass, LoggerEntity[]> =
      await this.getAllLogsUsecase.execute(filter);


      allLogs.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (logs: LoggerEntity[]) => {
        const resData = logs.map((log) => LoggerMapper.toEntity(log));
        return res.status(200).json(resData);
      }
    );
  }
}
