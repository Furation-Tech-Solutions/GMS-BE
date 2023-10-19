import { Request, Response, NextFunction, RequestHandler } from "express";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { UserAccount } from "@data/user-account/models/user-account-model";
import { UserEntity } from "@domain/user-account/entities/user-account";
// Define constants or enums for access levels
enum AccessLevel {
  SuperUser = "SuperUser",
  Manager = "Manager",
  SubManager = "Sub-Manager"
}

const unauthorizedResponse = (res: Response) => {
  const unAuthorized = ApiError.unAuthorized();
  res.status(unAuthorized.status).json({ message: unAuthorized.message });
};
export const checkPermission = (requiredPermission: number[]=[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const cookieEmail = req.cookies.email;
      const headerEmail=req.headers.email
      // console.log(email,req.cookies,"in permission array")

      const emailToCheck = headerEmail || cookieEmail;

      if (!emailToCheck) {
        // Handle the case when email is not present in headers or cookies
        unauthorizedResponse(res);
        return;
      }
      const permittedUser: UserEntity | null = await UserAccount.findOne({ email: emailToCheck });
      if (!permittedUser) {
        unauthorizedResponse(res);
        return;
      }
    
      const isSuperuser = permittedUser.accessLevel === AccessLevel.SuperUser;
      let hasRequiredPermission = false;

      permittedUser.permissions.forEach((permission:any)=>{
        if(requiredPermission.includes(permission)){
          hasRequiredPermission = true;
        }
      })

      if (isSuperuser && hasRequiredPermission) {
        next();
        return;
      }
      if (permittedUser.accessLevel === AccessLevel.Manager) {
        // If the user is a Manager, they should not be able to create SuperUsers
        if (req.body.accessLevel==="SuperUser") {
          unauthorizedResponse(res);
          console.log("unauthorized")
          return;
        }
      }
      // Handle other access levels
      switch (permittedUser.accessLevel) {
        case AccessLevel.SuperUser:
        case AccessLevel.Manager:
        case AccessLevel.SubManager:
          permittedUser.permissions.forEach((permission:any)=>{
            if(requiredPermission.includes(permission)){
              hasRequiredPermission = true;
            }
          })
          break;
        default:
          hasRequiredPermission = false;
      }
      if (hasRequiredPermission) {
        
        next();
      } else {
        unauthorizedResponse(res);
      }
    
    } catch (error) {
      const internalError = ApiError.internalError();
      res.status(internalError.status).json({ message: internalError.message });
    }
  };

};


