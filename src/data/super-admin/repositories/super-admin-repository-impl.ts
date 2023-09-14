import { SuperAdminModel, SuperAdminEntity } from "@domain/super-admin/entities/super-admin.entity";
import { SuperAdminRepository } from "@domain/super-admin/repositories/super-admin-repository"
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { SuperAdminDataSource } from "types/db";
import { Either, Left, Right } from "monet";

export class SuperAdminRepositoryImpl implements SuperAdminRepository {
  private readonly dataSource: SuperAdminDataSource;

  constructor(dataSource: SuperAdminDataSource) {
    this.dataSource = dataSource;
  }

  async createSuperAdmin(superAdmin: SuperAdminModel):Promise<Either<ErrorClass, SuperAdminEntity>> {
   
    try {

      const i =  await this.dataSource.create(superAdmin);
      return Right<ErrorClass, SuperAdminEntity>(i);
    } catch (error) {
      
      

      if(typeof ApiError.emailExist) {
        return Left<ErrorClass, SuperAdminEntity>(ApiError.emailExist())
      }
      return Left<ErrorClass, SuperAdminEntity>(ApiError.badRequest())
      
    }
  }

  async deleteSuperAdmin(id: string):Promise<Either<ErrorClass, void>> {
    try {

      const i = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(i);
      
    } catch (error) {
    
      return Left<ErrorClass, void>(ApiError.badRequest())
    }
   
  }

  async updateSuperAdmin(id: string, data: SuperAdminModel):Promise<Either<ErrorClass, SuperAdminEntity>> {

    try {
      
      const i =  await this.dataSource.update(id, data);
      return Right<ErrorClass, SuperAdminEntity>(i);
    } catch (error) {

      return Left<ErrorClass, SuperAdminEntity>(ApiError.badRequest())
    }
   
  }

  async getSuperAdmins(): Promise<Either<ErrorClass, SuperAdminEntity[]>> {
    try {
      const i =  await this.dataSource.getAllAdmins();
    return Right<ErrorClass, SuperAdminEntity[]>(i);
    } catch (error) {
      return Left<ErrorClass, SuperAdminEntity[]>(ApiError.badRequest())
    }
  }


  async getSuperAdminById(id: string): Promise<Either<ErrorClass, SuperAdminEntity>> {
      try {
        const i =  await this.dataSource.read(id);
        return Right<ErrorClass, SuperAdminEntity>(i);
      } catch (error) {
      return Left<ErrorClass, SuperAdminEntity>(ApiError.badRequest())
      }
  }
}
