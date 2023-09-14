import { AdminEntity } from "@domain/admin/entities/admin";
import { AdminRepository } from "@domain/admin/repositories/admin-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
export interface GetAllAdminsUsecase {
  execute: () => Promise<Either<ErrorClass, AdminEntity[]>>;
}

export class GetAllAdmins implements GetAllAdminsUsecase {
  private readonly adminRepository: AdminRepository;

  constructor(adminRepository: AdminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(): Promise<Either<ErrorClass, AdminEntity[]>> {
    return await this.adminRepository.getAdmins();
  }
}
