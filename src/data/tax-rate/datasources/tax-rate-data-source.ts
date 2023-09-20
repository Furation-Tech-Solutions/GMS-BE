import { TaxRateModel } from "@domain/tax-rate/entities/tax-rate";
import { TaxRate } from "../models/tax-rate-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";

export interface TaxRateDataSource{
    create(taxRate: TaxRateModel): Promise<any>; // Return type should be Promise of AdminEntity
    getAll():Promise<any[]>;
    delete(id: string): Promise<void>;
    read(id: string): Promise<any | null>;
    update(id: String, taxRateModel: TaxRateModel): Promise<any>;
    // getAllUsers(): Promise<any[]>;
  }

export class TaxRateDataSourceImpl implements TaxRateDataSource {

    constructor(private db: mongoose.Connection) {}
  
  async create(taxRate: TaxRateModel): Promise<any> {
      const existingRate = await TaxRate.findOne({ type: taxRate.type });
      if (existingRate) {
        throw ApiError.taxTypeExist();
      }
  
      const taxData = new TaxRate(taxRate);
      
      const createdTaxRate = await taxData.save();
  
      return createdTaxRate.toObject();
      
    }
    async getAll():Promise<any[]>{
      try{
       const taxRate=await TaxRate.find()
       return taxRate.map((taxRate)=>taxRate.toObject())

      }
      catch(err){
       throw ApiError.notFound()
      }

 }
 async delete(id:string):Promise<void>{
   try{
        await TaxRate.findByIdAndDelete(id)
   }
   catch(err){
     throw ApiError.notFound()
   }
 }
 async read(id: string): Promise<any | null> {
   try {
       const taxRate = await TaxRate.findById(id);
       return taxRate ? taxRate.toObject() : null;
   } catch (error) {
       throw ApiError.badRequest();
   } // Convert to a plain JavaScript object before returning
}
async update(id: string, taxRate: TaxRateModel): Promise<any> {
 try {
     const updatedTaxRate = await TaxRate.findByIdAndUpdate(id, taxRate, {
         new: true,
     }); // No need for conversion here
     return updatedTaxRate ? updatedTaxRate.toObject() : null; // Convert to a plain JavaScript object before returning
 } catch (error) {
     throw ApiError.badRequest();
 }
}
}