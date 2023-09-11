import { AdminModel, AdminEntity } from "@domain/admin/entities/admin";
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
export interface AdminRepository {
  createAdmin(admin: AdminModel): Promise<Either<ErrorClass, AdminEntity>>;
  deleteAdmin(id: string): Promise<Either<ErrorClass, void>>;
  updateAdmin(
    id: string,
    data: AdminModel
  ): Promise<Either<ErrorClass, AdminEntity>>;
  getAdmins(): Promise<Either<ErrorClass, AdminEntity[]>>;
  getAdminById(id: string): Promise<Either<ErrorClass, AdminEntity>>;
}
