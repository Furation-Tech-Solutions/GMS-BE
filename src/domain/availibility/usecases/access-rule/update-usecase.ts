

import { AccessRuleEntity, AccessRuleModel } from "@domain/availibility/entities/access-rule-entity";
import { ShiftEntity, ShiftModel } from "@domain/availibility/entities/shift-entity";
import { AccessRuleRepository } from "@domain/availibility/repositories/access-rule-repository";
import { ShiftRepository } from "@domain/availibility/repositories/shift-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface UpdateAccessRuleUsecase {
  execute: (
    accessRuleModelId: string,
    accessRuleModelData: AccessRuleModel
  ) => Promise<Either<ErrorClass, AccessRuleEntity>>;
}

export class UpdateAccessRule implements UpdateAccessRuleUsecase {
  private readonly accessRuleRepository: AccessRuleRepository;

  constructor(accessRuleRepository: AccessRuleRepository) {
    this.accessRuleRepository = accessRuleRepository;
  }

  async execute(
    accessRuleModelId: string,
    accessRuleModelData: AccessRuleModel
  ): Promise<Either<ErrorClass, AccessRuleEntity>> {
    return await this.accessRuleRepository.updateAccessRule(accessRuleModelId, accessRuleModelData)
  }
}
