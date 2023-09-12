import { type AdminRepository } from "@domain/admin/repositories/admin-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface DeleteAdminUsecase {
  execute: (adminId: string) => Promise<Either<ErrorClass, void>>;
}

export class DeleteAdmin implements DeleteAdminUsecase {
  private readonly adminRepository: AdminRepository;

  constructor(adminRepository: AdminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(adminId: string): Promise<Either<ErrorClass, void>> {
    return await this.adminRepository.deleteAdmin(adminId);
  }
}
