import {  UserLoginModel, UserModel } from "@domain/user-account/entities/user-account";
import mongoose from "mongoose";
import { UserAccount } from "../models/user-account-model";
import ApiError from "@presentation/error-handling/api-error";
import { Admin } from "@data/admin/models/admin-model";


export interface UserDataSource{
  create(user: UserModel): Promise<any>; // Return type should be Promise of AdminEntity
  getAllUsers(): Promise<any[]>;
  delete(id:string):Promise<void>;
  read(id: string): Promise<any | null>;
  update(id:string,user_account:UserModel):Promise<any>;
  userLogin(email: string, firebaseToken: string):Promise<any| null>;
  userLogout(email: string):Promise<any| null>;
  // userLogout(user:UserModel):Promise<any|null>

}

export class UserDataSourceImpl implements UserDataSource {

  constructor(private db: mongoose.Connection) {}

async create(user: UserModel): Promise<any> {
  
    const existingUser = await UserAccount.findOne({ email: user.email });
    const alluser = await UserAccount.find({})

    if (existingUser) {
      throw ApiError.emailExist();
    }

    const userData = new UserAccount(user);

    const createdUser = await userData.save();

    return createdUser.toObject();
    
  }

  async getAllUsers(): Promise<any[]> {
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
      const admin=await UserAccount.findById(id)
      //  console.log(admin,"admin data")
       if (admin) {
        // console.log(admin, "admin data");
        return admin.toObject();
      }

      const user = await UserAccount.findById(id);
      if(user){
        return user.toObject();
      }
      return null;
      // if(admin){
      // return admin.map((admin) => admin.toObject());
      // }
      // else{
      // return user.map((user) => user.toObject());
      // }
      // return user? user.toObject() : null;?
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
    console.log(error)
      throw ApiError.badRequest();
  }
}
async userLogin(email: string, firebaseToken: string):Promise<any| null>{
  try{

    const userData = await UserAccount.findOne({ email: email });

    if(userData){
       // Check if the Firebase token exists in the array
       const firebaseTokenExists = userData.firebaseDeviceToken.includes(firebaseToken);
        
       if (!firebaseTokenExists) {
         // If not found, add the Firebase token to the array
         userData.firebaseDeviceToken.push(firebaseToken);
         await userData.save(); // Save the updated document
       }
       userData.isLogin = true;
       await userData.save(); // Save the updated isLogin value
      return userData.toObject();
    }
    return null;
  } 
  catch(err){
    throw ApiError.badRequest();
  }
}

async userLogout(email:string):Promise<any|null>{
  try{
    const userData = await UserAccount.findOne({ email: email });

    if(userData){
       // Check if the Firebase token exists in the array        
      
       userData.isLogin = false;
       await userData.save(); // Save the updated isLogin value
      return userData.toObject();
    }
    return null
  }
  catch(err){
    throw ApiError.badRequest();
  }

}
}