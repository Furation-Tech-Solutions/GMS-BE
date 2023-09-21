
import { Request, Response, NextFunction, RequestHandler } from "express";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { UserAccount } from "@data/user-account/models/user-account-model";
import { IncomingHttpHeaders } from "http";
import { UserEntity } from "@domain/user-account/entities/user-account";

const verifyGranttedPermissions = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const unAuthorized = ApiError.unAuthorized();
    try {

      const { email }: any = req.cookies

      const permittedUser: UserEntity | null = await UserAccount.findOne({email: email})

      if(permittedUser?.accessLevel === 'Superuser'){
       const isPermitted =  permittedUser.permissions.map((permissionNumber) => {
            if(
                permissionNumber === 1101  || 
                permissionNumber === 1102  ||
                permissionNumber === 1103  ||
                permissionNumber === 1104  ||
                permissionNumber === 1105  ||
                permissionNumber === 1106  
                ) return true
        })


        if(isPermitted) next()
        else {
          res.status(unAuthorized.status).json({ message: unAuthorized.message });
        }
      }

    

     
    } catch (error) { 
      const internalError = ApiError.internalError();
      res.status(internalError.status).json({ message: internalError.message });
    }
  };