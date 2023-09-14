import { Either } from "monet";
import { AccessLevelEntity, AccessLevelModel } from "../entities/access-level";
import { ErrorClass } from "@presentation/error-handling/api-error";

export interface AccessLevelRepository {
    createAccessLevel(accessLevel: AccessLevelModel): Promise<Either<ErrorClass, AccessLevelEntity>>;
}