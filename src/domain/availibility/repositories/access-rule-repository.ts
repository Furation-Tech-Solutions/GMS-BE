
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { AccessRuleEntity, AccessRuleModel } from "../entities/access-rule-entity";

export interface AccessRuleRepository {
  createAccessRule(accessRule: AccessRuleModel): Promise<Either<ErrorClass, AccessRuleEntity>>;
  updateAccessRule( id: string , accessRuleData: AccessRuleModel ): Promise<Either<ErrorClass, AccessRuleEntity>>
  getAccessRuleById( id: string ): Promise<Either<ErrorClass, AccessRuleEntity>>
  deleteAccessRule(id: string): Promise<Either<ErrorClass, void>>;
  getAllAccessRule(): Promise<Either<ErrorClass, AccessRuleEntity[]>>;
}
 