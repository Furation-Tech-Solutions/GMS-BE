import { AdminModel, AdminEntity } from "@domain/admin/entities/admin";
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
// import { BookedByNameEntity, BookedByNameModel } from "../entities/booked-by-name";
import { ServersNameEntity, ServersNameModel } from "../entities/servers-name";

export interface ServerNameRepository {
    createServerName(serverName: ServersNameModel): Promise<Either<ErrorClass, ServersNameEntity>>;
    getAllServersName(): Promise<Either<ErrorClass, ServersNameEntity[]>>;
    getServerNameById(id: string):Promise<Either<ErrorClass, ServersNameEntity>>;
    updateServerName(id: string, data: ServersNameModel ): Promise<Either<ErrorClass, ServersNameEntity>> 
    deleteServerName(id: string): Promise<Either<ErrorClass, void>>;
}
