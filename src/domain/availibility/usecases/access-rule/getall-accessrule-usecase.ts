
import { AccessRuleEntity } from "@domain/availibility/entities/access-rule-entity";
import { AccessRuleRepository } from "@domain/availibility/repositories/access-rule-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface GetAllAccessRuleUsecase {
  execute: () => Promise<Either<ErrorClass, AccessRuleEntity[]>>;
}

export class GetAllAccessRule implements GetAllAccessRuleUsecase {
  private readonly accessRuleRepository: AccessRuleRepository;

  constructor(accessRuleRepository: AccessRuleRepository) {
    this.accessRuleRepository = accessRuleRepository;
  }

  async execute(): Promise<Either<ErrorClass, AccessRuleEntity[]>> {
    return await this.accessRuleRepository.getAllAccessRule();
  }
}
