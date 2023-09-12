import { Request, Response, NextFunction, RequestHandler } from "express";
import ApiError from "@presentation/error-handling/api-error"; 
import { AdminEntity } from "@domain/admin/entities/admin"; 
import { PermissionManager } from "@presentation/permission/permissionManager";

const adminView: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as AdminEntity; 

  if (
    user &&
    user.permissions &&
    Array.isArray(user.permissions) &&
    PermissionManager.hasPermission(
      PermissionManager.permissions.admin.view,
      user.permissions
    )
  ) {
    // Permission is valid, handle the request
    next();
  } else {
    const err = ApiError.unAuthorized();    
    res
      .status(err.status)
      .json({ message: err.message, updatedPermission: user.permissions });
  }
};

export default adminView;
