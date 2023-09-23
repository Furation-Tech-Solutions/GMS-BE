
import { Request, Response, NextFunction, RequestHandler } from "express";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { UserAccount } from "@data/user-account/models/user-account-model";
import { IncomingHttpHeaders } from "http";
import { UserEntity } from "@domain/user-account/entities/user-account";


export const checkPermission = (requiredPermission: string) => {
return  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const unAuthorized = ApiError.unAuthorized();
        
      const email = req.cookies.email;
      const permittedUser: UserEntity | null = await UserAccount.findOne({ email: email });

      if (!permittedUser) {
        res.status(unAuthorized.status).json({ message: unAuthorized.message });
        return;
      }

      const isSuperuser = permittedUser.accessLevel === 'Superuser';

      let hasRequiredPermission = false;
      
      for (const permissionObj of permittedUser.permissions) {
        const permissionCode = Object.keys(permissionObj)[0]; 
        if (permissionCode == requiredPermission) {
          hasRequiredPermission = true;
          break;
        }
      }

      if (isSuperuser && hasRequiredPermission) {
        next();
      } else {
        res.status(unAuthorized.status).json({ message: unAuthorized.message });
      }



       if (permittedUser?.accessLevel === 'Manager'){
        const isPermitted =  permittedUser.permissions.map((permissionNumber) => {
          if(
              permissionNumber === requiredPermission  
              ) return true
      })

      if(isPermitted) next()
      else {
        res.status(unAuthorized.status).json({ message: unAuthorized.message });
      }
      }

       if (permittedUser?.accessLevel === 'Sub-Manager'){
        const isPermitted =  permittedUser.permissions.map((permissionNumber) => {
          if(
              permissionNumber === requiredPermission  
              ) return true
      })

      if(isPermitted) next()
      else {
        res.status(unAuthorized.status).json({ message: unAuthorized.message });
      }
      }

      else if (permittedUser?.accessLevel === 'Basic'){
        const isPermitted =  permittedUser.permissions.map((permissionNumber) => {
          if(
              permissionNumber === requiredPermission  
              ) return true
      })

      if(isPermitted) next()
      else {
        res.status(unAuthorized.status).json({ message: unAuthorized.message });
      }
      }
     
    } catch (error) { 
      const internalError = ApiError.internalError();
      console.log(error,"error")
      res.status(internalError.status).json({ message: internalError.message });
    }
  }
};