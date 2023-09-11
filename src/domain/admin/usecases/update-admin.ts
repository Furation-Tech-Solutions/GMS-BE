import { AdminEntity, AdminModel } from "@domain/admin/entities/admin";
import { AdminRepository } from "@domain/admin/repositories/admin-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
export interface UpdateAdminUsecase {
  execute: (
    adminId: string,
    adminData: AdminModel
  ) => Promise<Either<ErrorClass, AdminEntity>>;
}

export class UpdateAdmin implements UpdateAdminUsecase {
  private readonly adminRepository: AdminRepository;

  constructor(adminRepository: AdminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(
    adminId: string,
    adminData: AdminModel
  ): Promise<Either<ErrorClass, AdminEntity>> {
    return await this.adminRepository.updateAdmin(adminId, adminData);
  }
}
