import { SuperAdminEntity, SuperAdminModel } from "@domain/super-admin/entities/super-admin.entity";
import { SuperAdminRepository } from "@domain/super-admin/repositories/super-admin-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface CreateSuperAdminUsecase {
  execute: (superAdminData: SuperAdminModel) => Promise<Either<ErrorClass,SuperAdminEntity>>;
}

export class CreateSuperAdmin implements CreateSuperAdminUsecase {
  private readonly superAdminRepository: SuperAdminRepository;

  constructor(superAdminRepository: SuperAdminRepository) {
    this.superAdminRepository = superAdminRepository;
  }

  async execute(superAdminData: SuperAdminModel):Promise<Either<ErrorClass,SuperAdminEntity>> {
    return await this.superAdminRepository.createSuperAdmin(superAdminData);
  }
}
