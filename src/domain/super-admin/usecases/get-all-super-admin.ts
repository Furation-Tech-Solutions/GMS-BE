import { SuperAdminEntity } from "@domain/super-admin/entities/super-admin.entity";
import { SuperAdminRepository } from "@domain/super-admin/repositories/super-admin-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface GetAllSuperAdminsUsecase {
  execute: () => Promise<Either<ErrorClass, SuperAdminEntity[]>>;
}

export class GetAllSuperAdmins implements GetAllSuperAdminsUsecase {
  private readonly SuperAdminRepository: SuperAdminRepository;

  constructor(SuperAdminRepository: SuperAdminRepository) {
    this.SuperAdminRepository = SuperAdminRepository;
  }

  async execute():Promise<Either<ErrorClass, SuperAdminEntity[]>> {
    return await this.SuperAdminRepository.getSuperAdmins();
  }
}
