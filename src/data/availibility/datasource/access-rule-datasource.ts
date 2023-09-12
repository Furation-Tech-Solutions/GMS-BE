
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
import AccessRule from "../models/access-rule-model";
import { AccessRuleModel } from "@domain/availibility/entities/access-rule-entity";

export interface AccessRuleDataSource {
  create(accessRule: AccessRuleModel): Promise<any>;
  update(id: string, accessRuleData: AccessRuleModel): Promise<any>;
  read(id: string): Promise<any>;
  delete(id: string): Promise<void>;
  getAll() : Promise<any[]>;
}

export class AccessRuleDataSourceImpl implements AccessRuleDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(accessRule: AccessRuleModel): Promise<any> {

    const accessRuleData = new AccessRule(accessRule);
    const savedAccessRule: mongoose.Document = await accessRuleData.save();
    return savedAccessRule.toObject();
  }



  async update(id: string, accessRuleData: AccessRuleModel): Promise<any> {
    try {
      const updatedAccessRule = await AccessRule.findByIdAndUpdate(id, accessRuleData, {
        new: true,
      }); // No need for conversion here
      return updatedAccessRule ? updatedAccessRule.toObject() : null; // Convert to plain JavaScript object before returning
    } catch (error) {
      throw ApiError.badRequest();
    }
  }

  async read(id: string): Promise<any> {
    try {
      const accessRule = await AccessRule.findById(id);
      if (!accessRule) {
        throw ApiError.notFound();
      }
      return accessRule && accessRule.toObject(); // Convert to plain JavaScript object before returning
    } catch (error) {
      throw ApiError.badRequest();
    }
  }

  async delete(id: string): Promise<void> {
    await AccessRule.findByIdAndDelete(id);
  }

  async getAll(): Promise<any[]> {
    try {
      const accessRules = await AccessRule.find();
      return accessRules.map((accessRule) => accessRule.toObject()); // Convert to plain JavaScript objects before returning
    } catch (error) {
      throw ApiError.notFound();
    }
  }

}
