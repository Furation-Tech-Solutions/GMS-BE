import ApiError from "@presentation/error-handling/api-error";
import { Response } from "express";
import * as ErrorMessage from "@presentation/error-handling/message-error";



export const unauthorizedResponse = (res: Response) => {
    const unAuthorized = ApiError.unAuthorized();
    res.status(unAuthorized.status).json({ message: unAuthorized.message });
  };
  
export const unableToReserved = (res: Response) => {
    const unAuthorized = ApiError.unAuthorized();
    res.status(unAuthorized.status).json({ message: ErrorMessage.INSUFFICIENT_PRIVILEGES });
};
  
 export  const unableToUpdateReservation = (res: Response) => {
    const unAuthorized = ApiError.unAuthorized();
    res.status(unAuthorized.status).json({ message: ErrorMessage.INSUFFICIENT_PRIVILEGES });
}
  
 export const unableToDelete = (res: Response) => {
    const unAuthorized = ApiError.unAuthorized();
    res.status(unAuthorized.status).json({ message: ErrorMessage.INSUFFICIENT_PRIVILEGES });
}
  
export  const suspendedUser = (res: Response) => {
    const unAuthorized = ApiError.unAuthorized();
    res.status(unAuthorized.status).json({ message: ErrorMessage.INSUFFICIENT_PRIVILEGES });
};