import { UserModel } from "@domain/user-account/entities/user-account";
import mongoose from "mongoose";
import { UserAccount } from "../models/user-account-model";
import ApiError from "@presentation/error-handling/api-error";


export interface UserDataSource{
  create(user: UserModel): Promise<any>; // Return type should be Promise of AdminEntity
  getAllUsers(): Promise<any[]>;
  delete(id:string):Promise<void>;
  read(id: string): Promise<any | null>;
  update(id:string,user_account:UserModel):Promise<any>

}

export class UserDataSourceImpl implements UserDataSource {

  constructor(private db: mongoose.Connection) {}

async create(user: UserModel): Promise<any> {
    const existingUser = await UserAccount.findOne({ email: user.email });
    if (existingUser) {
      throw ApiError.emailExist();
    }

    const userData = new UserAccount(user);
    
    const createdUser = await userData.save();

    return createdUser.toObject();
    
  }
  async getAllUsers(): Promise<any[]> {
    //change by jatin
    try{
    const users = await UserAccount.find();
    return users.map((user) => user.toObject());
  }
  
  catch(error){
   throw ApiError.notFound();
  }
 }
 async delete(id:string):Promise<void>{
  try{
       await UserAccount.findByIdAndDelete(id)
  }
  catch(err){
    throw ApiError.notFound()
  }
}
async read(id: string): Promise<any | null> {
  try {
      const user = await UserAccount.findById(id);
      return user? user.toObject() : null;
  } catch (error) {
      throw ApiError.badRequest();
  } // Convert to a plain JavaScript object before returning
}
async update(id: string, user_account: UserModel): Promise<any> {
  try {
      const updatedUserAccount = await UserAccount.findByIdAndUpdate(id, user_account, {
          new: true,
      }); // No need for conversion here
      return updatedUserAccount ? updatedUserAccount.toObject() : null; // Convert to a plain JavaScript object before returning
  } catch (error) {
      throw ApiError.badRequest();
  }
}
}