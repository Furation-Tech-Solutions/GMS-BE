import { Request, Response, NextFunction } from "express";
import ApiError from "@presentation/error-handling/api-error";
import { UserAccount } from "@data/user-account/models/user-account-model";
import { UserEntity } from "@domain/user-account/entities/user-account";
import { AddReservation } from "@data/add-reservation/models/add-reservation-model";
import {
  suspendedUser,
  unableToDelete,
  unableToReserved,
  unableToUpdateReservation,
  unauthorizedResponse
} from "@presentation/utils/unauthorized_response/response";


// Define constants or enums for access levels
enum AccessLevel {
  SuperUser = "Superuser",
  Manager = "Manager",
  SubManager = "Sub-Manager"
}

/**
 * Middleware to check user permissions
 * @param requiredPermission Array of required permissions
 */

export const checkPermission = (requiredPermission: number[] = []) => {

  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

      // Extract email from cookies or headers
      const cookieEmail = req.cookies.email;
      const headerEmail = req.headers.email;
      const emailToCheck = headerEmail || cookieEmail;


      // Check if email is present
      if (!emailToCheck) {
        unauthorizedResponse(res);
        return;
      }


      // Find the user based on the email
      const permittedUser: UserEntity | null = await UserAccount.findOne({ email: emailToCheck });

      // If user not found, send unauthorized response
      if (!permittedUser) {
        unauthorizedResponse(res);
        return;
      }


      // Check if the user is a superuser and has required permissions
      const isSuperuser = permittedUser.accessLevel === AccessLevel.SuperUser;
      let hasRequiredPermission = false;

      permittedUser.permissions.forEach((permission: any) => {
        if (requiredPermission.includes(permission)) {
          hasRequiredPermission = true;
        }
      })

      if (isSuperuser && hasRequiredPermission) {
        next();
        return;
      }


      // check the permissions for the Manager
      if (permittedUser.accessLevel === AccessLevel.Manager) {
        if (req.body.accessLevel == "Superuser" || req.body.accessLevel == "Manager") {
          unauthorizedResponse(res);
          return;
        }

        if (req.body.managerSettings?.suspended) {
          suspendedUser(res);
          return;
        }
      }

      // check the permissions for the Sub-Manager
      if (permittedUser.accessLevel === AccessLevel.SubManager) {

        const reservationId = req.params.addReservationId


        if (req.body.table.length > 0) {
          unableToReserved(res);
          return;
        }

        if (reservationId) {
          const reservationData = await AddReservation.findById(reservationId)

          if (req.method !== "DELETE") {
            if (reservationData && reservationData.reservationStatus !== "left" || reservationData && reservationData.reservationStatus !== "unassigned") {
              unableToUpdateReservation(res);
              return;
            }
            else {
              if (reservationData && reservationData.reservationStatus === "left") {
                if (!req.body.prepayment) {
                  unableToUpdateReservation(res);
                  return;

                }
              } if (reservationData && reservationData.reservationStatus === "unassigned") {
                if (req.body.reservationStatus || req.body.table) {
                  unableToUpdateReservation(res);
                }
              }
            }

          }
          else {

            if (reservationData && reservationData.reservationStatus !== "unassigned") {
              unableToDelete(res)
              return
            }
          }
        }

        if (req.body.managerSettings?.suspended) {
          suspendedUser(res);
          return;
        }

      }

      // Check permissions for other access levels
      switch (permittedUser.accessLevel) {
        case AccessLevel.SuperUser:
        case AccessLevel.Manager:
        case AccessLevel.SubManager:
          permittedUser.permissions.forEach((permission: any) => {
            if (requiredPermission.includes(permission)) {
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


