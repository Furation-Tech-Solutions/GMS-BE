import { type SuperAdminRepository } from "@domain/super-admin/repositories/super-admin-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface DeleteSuperAdminUsecase {
  execute: (superAdminId: string) => Promise<Either<ErrorClass, void>>
}

export class DeleteSuperAdmin implements DeleteSuperAdminUsecase {
  private readonly superAdminRepository: SuperAdminRepository;

  constructor(superAdminRepository: SuperAdminRepository) {
    this.superAdminRepository = superAdminRepository;
  }

  async execute(superAdminId: string): Promise<Either<ErrorClass, void>> {
    return await this.superAdminRepository.deleteSuperAdmin(superAdminId)
  }
}
