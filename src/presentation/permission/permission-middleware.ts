import { Request, Response, NextFunction, RequestHandler } from "express";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { UserAccount } from "@data/user-account/models/user-account-model";
import { UserEntity } from "@domain/user-account/entities/user-account";
import { AddReservation } from "@data/add-reservation/models/add-reservation-model";
// Define constants or enums for access levels
enum AccessLevel {
  SuperUser = "Superuser",
  Manager = "Manager",
  SubManager = "Sub-Manager"
}

const unauthorizedResponse = (res: Response) => {
  const unAuthorized = ApiError.unAuthorized();
  res.status(unAuthorized.status).json({ message: unAuthorized.message });
};
const unableToReserved = (res: Response) => {
  const unAuthorized = ApiError.unAuthorized();
  res.status(unAuthorized.status).json({ message: "Insufficient Privileges" });
};
const unableToUpdateReservation=(res:Response)=>{
  const unAuthorized = ApiError.unAuthorized();
  res.status(unAuthorized.status).json({ message: "you are not assignable to update reservation" });
}
const unableToDelete=(res:Response)=>{
  const unAuthorized = ApiError.unAuthorized();
  res.status(unAuthorized.status).json({ message: "you are not assignable to delete reservation" });

}
const suspendedUser = (res: Response) => {
  const unAuthorized = ApiError.unAuthorized();
  res.status(unAuthorized.status).json({ message: "you are not assignable to suspend user"});
};
export const checkPermission = (requiredPermission: number[]=[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const cookieEmail = req.cookies.email;
      const headerEmail=req.headers.email
      // const outletId = req.headers.outletid as string;
      // console.log(email,req.cookies,"in permission array")

      const emailToCheck = headerEmail || cookieEmail;
        // console.log(emailToCheck,"email to check")

      if (!emailToCheck) {
        // Handle the case when email is not present in headers or cookies
        unauthorizedResponse(res);
        // console.log("inside if block 29")
        return;
      }
      const permittedUser: UserEntity | null = await UserAccount.findOne({ email: emailToCheck });

      // const verifyBelongsToOutlet = permittedUser?.outlet.includes(outletId)


      if (!permittedUser) {
        unauthorizedResponse(res);
        return;
      }

      // if(!verifyBelongsToOutlet) {
      //   unauthorizedResponse(res);
      //   return 
      // }
    
      const isSuperuser = permittedUser.accessLevel === AccessLevel.SuperUser;
      let hasRequiredPermission = false;

      permittedUser.permissions.forEach((permission:any)=>{
        if(requiredPermission.includes(permission)){
          hasRequiredPermission = true;
        }
      })

      if (isSuperuser && hasRequiredPermission) {
        // console.log("line 51")
        next();
        return;
      }
      if (permittedUser.accessLevel === AccessLevel.Manager) {
        // If the user is a Manager, they should not be able to create SuperUsers
        if (req.body.accessLevel=="Superuser" || req.body.accessLevel=="Manager"  ) {
          unauthorizedResponse(res);
          return;
        }
        console.log("in manager if")
        if(req.body.managerSettings?.suspended){
        
          console.log("unauthorized in permision")
          suspendedUser(res);
          return;
        }
        
      }

      if (permittedUser.accessLevel === AccessLevel.SubManager) {
        // If the user is a Manager, they should not be able to create SuperUsers
        const reservationId=req.params.addReservationId
        // console.log(reservationId,"reservationid",req.method,req.params)
        if (req.body.table ) {
          unableToReserved(res);
          return;
        }
          if(reservationId){
            // console.log("in reservationid")
            const reservationData=await AddReservation.findById(reservationId)
            // console.log(reservationData,"reservationData is this")
           
            if(req.method!=="DELETE"){
              // console.log(req.body,"inside req.body")
              if(reservationData && reservationData.reservationStatus!=="left" || reservationData && reservationData.reservationStatus!=="unassigned" ){
                unableToUpdateReservation(res);
                  return;
              }
              else{
              if(reservationData && reservationData.reservationStatus==="left"){
                    if(!req.body.prepayment ){
                      unableToUpdateReservation(res);
                      return;
  
                    }
              }if(reservationData && reservationData.reservationStatus==="unassigned"){
                if(req.body.reservationStatus || req.body.table ){
                  unableToUpdateReservation(res);
                }
              }
            }
                  
            }
            else{
              
                 if(reservationData && reservationData.reservationStatus!=="unassigned"){
                  unableToDelete(res)
                  return
                 }
            }
        }
        console.log(req.body,"req.body is this")
        if(req.body.managerSettings?.suspended){
          console.log("unauthorized in permision")
          suspendedUser(res);
          return;
        }

          }
          
      
      
      // }
      
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
      console.log(error)
      const internalError = ApiError.internalError();
      res.status(internalError.status).json({ message: internalError.message });
    }
  };

};


