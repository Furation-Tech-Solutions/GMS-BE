import { SuperAdminEntity, SuperAdminModel } from "@domain/super-admin/entities/super-admin.entity";
import { SuperAdminRepository } from "@domain/super-admin/repositories/super-admin-repository";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface UpdateSuperAdminUsecase {
  execute: (
    superAdminId: string,
    superAdminData: SuperAdminModel
  ) => Promise<Either<ErrorClass, SuperAdminEntity>> ;
}

export class UpdateSuperAdmin implements UpdateSuperAdminUsecase {

  private readonly SuperAdminRepository: SuperAdminRepository;

  constructor(SuperAdminRepository: SuperAdminRepository) {
    this.SuperAdminRepository = SuperAdminRepository;
  }

  async execute(
    superAdminId: string,
    superAdminData: SuperAdminModel
  ): Promise<Either<ErrorClass, SuperAdminEntity>> {
    return await this.SuperAdminRepository.updateSuperAdmin(superAdminId, superAdminData);
  }
}


