import { SuperAdminModel, SuperAdminEntity } from "@domain/super-admin/entities/super-admin.entity";
import { ErrorClass } from "@presentation/error-handling/api-error";
import {Either} from "monet";

export interface SuperAdminRepository {
  createSuperAdmin(superadmin: SuperAdminModel):Promise<Either<ErrorClass,SuperAdminEntity>>;
  deleteSuperAdmin(id: string):Promise<Either<ErrorClass,void>>;
  updateSuperAdmin(id: string, data: SuperAdminModel):Promise<Either<ErrorClass, SuperAdminEntity>>;
  getSuperAdmins(): Promise<Either<ErrorClass, SuperAdminEntity[]>>;
  getSuperAdminById(id: string): Promise<Either<ErrorClass, SuperAdminEntity>>;
}
