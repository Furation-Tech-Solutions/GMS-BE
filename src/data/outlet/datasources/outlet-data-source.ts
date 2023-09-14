import { OutletModel, OutletEntity } from "@domain/outlet/entities/outlet";
import { Outlet } from "../models/outlet-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
import { Admin } from "@data/admin/models/admin-model";

export interface OutletDataSource {
  create(outlet: OutletModel): Promise<any>;
  getById(id: string): Promise<any | null>;
  getAllOutlets(): Promise<any[]>;
  update(id: string, outlet: OutletModel): Promise<any>;
  delete(id: string): Promise<void>;
  suspend(id: string): Promise<void>;
  reactivate(id: string): Promise<any>;
}

export class OutletDataSourceImpl implements OutletDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(outlet: OutletModel): Promise<any> {
    const existingOutlet = await Outlet.findOne({ email: outlet.email });
    if (existingOutlet) {
      throw ApiError.emailExist();
    }

    const outletData = new Outlet(outlet);

    const createdOutlet = await outletData.save();

    return createdOutlet.toObject();
  }

  async getById(id: string): Promise<any | null> {
    const outlet = await Outlet.findById(id).populate("admins");
    return outlet ? outlet.toObject() : null;
  }

  async getAllOutlets(): Promise<any[]> {
    //change by jatin
    const outlets = await Outlet.find().populate("admins");;
    return outlets.map((outlet) => outlet.toObject());
  }

  async update(id: string, outlet: OutletModel): Promise<any> {
    const updatedOutlet = await Outlet.findByIdAndUpdate(id, outlet, {
      new: true,
    });
    return updatedOutlet ? updatedOutlet.toObject() : null;
  }

  async delete(id: string): Promise<void> {
    await Outlet.findByIdAndDelete(id);
    await Admin.deleteMany({ outlet: id });
  }

  async suspend(id: string): Promise<void> {
    const outlet = await Outlet.findById(id);
    if (!outlet) {
      throw ApiError.notFound;
    }

    outlet.active = false;
    await outlet.save();
  }

  async reactivate(id: string): Promise<any> {
    const outlet = await Outlet.findById(id);
    if (!outlet) {
      throw ApiError.notFound;
    }
    outlet.active = true;
    const reactivatedOutlet = await outlet.save();
    return reactivatedOutlet.toObject();
  }
}
