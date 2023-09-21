

import { AccessRuleEntity, AccessRuleModel } from "@domain/availibility/entities/access-rule-entity";
import { AccessRuleRepository } from "@domain/availibility/repositories/access-rule-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface CreateAccessRuleUsecase {
  execute: (accessRuleData: AccessRuleModel) => Promise<Either<ErrorClass, AccessRuleEntity>>;
}

export class CreateAccessRule implements CreateAccessRuleUsecase {
  private readonly accessRuleRepository: AccessRuleRepository;

  constructor(accessRuleRepository: AccessRuleRepository) {
    this.accessRuleRepository = accessRuleRepository;
  }

  async execute(accessRuleData: AccessRuleModel): Promise<Either<ErrorClass,AccessRuleEntity>> {
    return await this.accessRuleRepository.createAccessRule(accessRuleData)
  }
  
}
