import { SuperAdminModel, SuperAdminEntity } from "@domain/super-admin/entities/super-admin.entity";
import { Admin } from "@data/admin/models/admin-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
import { SuperAdminDataSource } from "types/db";



export class SuperAdminDataSourceImpl implements SuperAdminDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(superAdmin: SuperAdminModel): Promise<any> {
    const existingSuperAdmin = await Admin.findOne({ email: superAdmin.email });
    if (existingSuperAdmin) {
      throw ApiError.emailExist()
    }


    superAdmin.superAdmin = true;
  
    const superAdminData = new Admin(superAdmin);

    const createdSuperAdmin = await superAdminData.save();

    
    return createdSuperAdmin.toObject();
  }

  async update(id: string, superAdmin: SuperAdminModel): Promise<any> {
    const updatedSuperAdmin = await Admin.findByIdAndUpdate(id, superAdmin, {
      new: true,
    });
    return updatedSuperAdmin ? updatedSuperAdmin.toObject() : null; 
  }

  async delete(id: string): Promise<void> {
    await Admin.findByIdAndDelete(id);
  }

  async read(id: string):Promise<any> {
    const superAdmin = await Admin.findById(id);
    return superAdmin ? superAdmin.toObject() : null; 
  }

  async getAllAdmins(): Promise<SuperAdminEntity[]> {
    const superAdmins = await Admin.find();
    return superAdmins.map((superAdmin) => superAdmin.toObject()); 
  }
}
