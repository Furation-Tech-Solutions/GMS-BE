import { AdminModel, AdminEntity } from "@domain/admin/entities/admin";
import { Admin } from "../models/admin-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
import { Outlet } from "@data/outlet/models/outlet-model";
export interface AdminDataSource {
  create(admin: AdminModel): Promise<any>; // Return type should be Promise of AdminEntity
  update(id: string, admin: AdminModel): Promise<any>; // Return type should be Promise of AdminEntity
  delete(id: string): Promise<void>;
  read(id: string): Promise<AdminEntity>; // Return type should be Promise of AdminEntity or null
  getAllAdmins(): Promise<AdminEntity[]>; // Return type should be Promise of an array of AdminEntity
}

export class AdminDataSourceImpl implements AdminDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(admin: AdminModel): Promise<any> {
    const existingAdmin = await Admin.findOne({ email: admin.email });
    if (existingAdmin) {
      throw ApiError.emailExist();
    }

    const adminData = new Admin(admin);
    
    const createdAdmin: mongoose.Document = await adminData.save();
    
    const outletId = admin.outlet;

    if (outletId === null) {
      throw ApiError.notFound();
    }

 const outlet = await Outlet.findById(outletId).populate("admins");

 if (outlet) {
   outlet.admins.push(createdAdmin._id);
   await outlet.save()
 }
    return createdAdmin.toObject();
  }

  async update(id: string, admin: AdminModel): Promise<any> {
    try {
      const updatedAdmin = await Admin.findByIdAndUpdate(id, admin, {
        new: true,
      }); // No need for conversion here
      return updatedAdmin ? updatedAdmin.toObject() : null; // Convert to plain JavaScript object before returning
    } catch (error) {
      throw ApiError.badRequest();
    }
  }

  async delete(id: string): Promise<void> {
    await Admin.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any> {
    try {
      const admin = await Admin.findById(id);
      if (!admin) {
        throw ApiError.notFound();
      }
      return admin && admin.toObject(); // Convert to plain JavaScript object before returning
    } catch (error) {
      throw ApiError.badRequest();
    }
  }

  async getAllAdmins(): Promise<any[]> {
    try {
      const admins = await Admin.find();
      return admins.map((admin) => admin.toObject()); // Convert to plain JavaScript objects before returning
    } catch (error) {
      throw ApiError.notFound();
    }
  }
}
