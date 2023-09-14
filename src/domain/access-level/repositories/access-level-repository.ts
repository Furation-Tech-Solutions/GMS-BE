import { Either } from "monet";
import { AccessLevelEntity, AccessLevelModel } from "../entities/access-level";
import { ErrorClass } from "@presentation/error-handling/api-error";

export interface AccessLevelRepository {
    createAccessLevel(accessLevel: AccessLevelModel): Promise<Either<ErrorClass, AccessLevelEntity>>;
    getAccessLevel():Promise<Either<ErrorClass,AccessLevelEntity[]>>;
    deleteAccessLevel(id: string): Promise<Either<ErrorClass, void>> ;
    getAccessLevelById(id: string): Promise<Either<ErrorClass, AccessLevelEntity>>; 
    updateAccessLevel(
        id: string,
        data: AccessLevelModel
    ): Promise<Either<ErrorClass, AccessLevelEntity>>; 
}