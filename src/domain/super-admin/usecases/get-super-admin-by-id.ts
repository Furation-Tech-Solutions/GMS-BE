import { SuperAdminEntity } from "@domain/super-admin/entities/super-admin.entity";
import { SuperAdminRepository } from "@domain/super-admin/repositories/super-admin-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface GetSuperAdminByIdUsecase {
  execute: (superAdminId: string) => Promise<Either<ErrorClass, SuperAdminEntity>>;
}

export class GetSuperAdminById implements GetSuperAdminByIdUsecase {
  private readonly superAdminRepository: SuperAdminRepository;

  constructor(superAdminRepository: SuperAdminRepository) {
    this.superAdminRepository = superAdminRepository;
  }

  async execute(superAdminId: string):Promise<Either<ErrorClass, SuperAdminEntity>> {
    return await this.superAdminRepository.getSuperAdminById(superAdminId)
  }
  
}
