


import { AccessRuleRepository } from "@domain/availibility/repositories/access-rule-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface DeleteAccessRuleUsecase {
  execute: (accessId: string) => Promise<Either<ErrorClass, void>>;
}

export class DeleteAccessRule implements DeleteAccessRuleUsecase {
  private readonly accessRuleRepository: AccessRuleRepository;

  constructor(accessRuleRepository: AccessRuleRepository) {
    this.accessRuleRepository = accessRuleRepository;
  }

  async execute(accessId: string): Promise<Either<ErrorClass, void>> {
    return await this.accessRuleRepository.deleteAccessRule(accessId);
  }
}
