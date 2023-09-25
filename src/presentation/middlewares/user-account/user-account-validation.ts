import Joi, { ValidationErrorItem } from "joi";
import ApiError from "@presentation/error-handling/api-error";
import { Request, Response, NextFunction } from "express";

interface UserAccountInput {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle?: string;
  accessLevel:
    | "Superuser"
    | "User Manager Only"
    | "Manager"
    | "Sub-Manager"
    | "Basic"
    | "Basic iPad";
  managerSettings: {
    emailAlertsEnabled?: boolean;
    multifactorAuthenticationEnabled?: boolean;
    suspended?: boolean;
    lastLogin?: string;
    lastPasswordReset?: string;
  };
  randomPassword?: string;
  isLogin?: boolean;
  permissions?: [{ key: Number; value: String }];
  emailNotification?: [{ key: Number; value: String }];
  updatedBy?: string;
  createdBy?: string;
  firebaseDeviceToken?: string;
}

const userAccountValidator = (
  input: UserAccountInput,
  isUpdate: boolean = false
) => {
  const schema = Joi.object<UserAccountInput>({
    firstName: Joi.string().trim().required().messages({
      "string.base": "First Name must be a string",
      "string.empty": "First Name is required",
      "any.required": "First Name is required",
    }),
    lastName: Joi.string().trim().required().messages({
      "string.base": "Last Name must be a string",
      "string.empty": "Last Name is required",
      "any.required": "Last Name is required",
    }),
    email: Joi.string().trim().email().required().messages({
      "string.base": "Email must be a string",
      "string.empty": "Email is required",
      "string.email": "Please provide a valid email address",
      "any.required": "Email is required",
    }),
    jobTitle: Joi.string().trim().optional().messages({
      "string.base": "Job Title must be a string",
    }),
    accessLevel: Joi.string()
      .valid(
        "Superuser",
        "User Manager Only",
        "Manager",
        "Sub-Manager",
        "Basic",
        "Basic iPad"
      )
      .required()
      .messages({
        "string.base": "Access Level must be a valid string",
        "any.only": "Access Level must be one of the allowed values",
        "any.required": "Access Level is required",
      }),
    managerSettings: Joi.object({
      emailAlertsEnabled: Joi.boolean().optional(),
      multifactorAuthenticationEnabled: Joi.boolean().optional(),
      suspended: Joi.boolean().optional(),
      lastLogin: Joi.string().trim().allow("").optional(),
      lastPasswordReset: Joi.string().allow("").trim().optional(),
    }).optional(),
    randomPassword: Joi.string().trim().optional().messages({
      "string.base": "random Password must be a string",
    }),
    isLogin: Joi.boolean().default(false),

    permissions: Joi.array().optional(),
    // .items(Joi.object({
    //   key: Joi.number().required(),
    //   value: Joi.string().required(),
    // }))
    // .required()
    // .min(1) // Ensures the array has at least one element
    // .messages({
    //   "array.base": "Permissions must be an array of objects with 'key' (number) and 'value' (string)",
    //   "array.min": "At least one permission is required",
    // }),
    emailNotification: Joi.array().optional(),
    updatedBy: isUpdate
      ? Joi.string().trim().optional().messages({
          "any.required": "Please select the Updated By",
        })
      : Joi.string().trim().optional().messages({
          "any.required": "Please select the Update By",
        }),
    createdBy: isUpdate
      ? Joi.string().trim().optional().messages({
          "any.required": "Please select the Created By",
        })
      : Joi.string().trim().optional().messages({
          "any.required": "Please select the Created By",
        }),
    firebaseDeviceToken: Joi.string(),
    // .items(Joi.object({
    //   key: Joi.number(),
    //   value: Joi.string(),
    // }))
    // .optional(),
  });

  const { error, value } = schema.validate(input, {
    abortEarly: false,
  });

  if (error) {
    const validationErrors: string[] = error.details.map(
      (err: ValidationErrorItem) => err.message
    );
    throw new ApiError(
      ApiError.badRequest().status,
      validationErrors.join(", "),
      "ValidationError"
    );
  }

  return value;
};

export const validateUserAccountInputMiddleware = (
  isUpdate: boolean = false
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract the request body
      // const { body } = req;
      const { password, ...userDataWithoutPassword } = req.body;

      // Validate the input using the userAccountValidator
      const validatedInput: UserAccountInput = userAccountValidator(
        userDataWithoutPassword,
        isUpdate
      );

      // Continue to the next middleware or route handler
      next();
    } catch (error: any) {
      // if (error instanceof ApiError) {
      //   return res.status(error.status).json(error.message);
      // }

      // Respond with the custom error
      // const err = ApiError.badRequest();
      return res.status(500).json({ error: error.message });
    }
  };
};
