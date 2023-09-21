

import { AccessRuleEntity } from "@domain/availibility/entities/access-rule-entity";
import { AccessRuleRepository } from "@domain/availibility/repositories/access-rule-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface GetAcessRuleByIdUsecase {
  execute: (accessId: string) => Promise<Either<ErrorClass, AccessRuleEntity>>;
}

export class GetAccessRuleById implements GetAcessRuleByIdUsecase {
  private readonly accessRuleRepository: AccessRuleRepository;

  constructor(accessRuleRepository: AccessRuleRepository) {
    this.accessRuleRepository = accessRuleRepository;
  }

  async execute(accessId: string): Promise<Either<ErrorClass, AccessRuleEntity>> {
    return await this.accessRuleRepository.getAccessRuleById(accessId);
  }
}
