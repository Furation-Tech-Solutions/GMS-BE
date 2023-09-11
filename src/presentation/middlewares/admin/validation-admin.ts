import Joi, { ValidationError, ValidationErrorItem } from "joi";
import ApiError from "@presentation/error-handling/api-error";
import { Request, Response, NextFunction } from "express";

interface AdminInput {
  name: string;
  email: string;
  phone: number;
  brand: string;
  jobTitle?: string;
  superAdmin?: boolean;
  admin?: boolean;
  permissions?: number[];
  active?: boolean;
  outlet?: string;
}

const adminValidator = function (input: AdminInput): AdminInput {
  // Define the adminSchema for input validation
  const adminSchema = Joi.object<AdminInput>({
    name: Joi.string().required().max(53).trim().messages({
      "string.base": "Name must be a string",
      "string.empty": "Name is required",
      "string.max": "Name should be under 53 characters",
      "any.required": "Name is required",
    }),
    email: Joi.string().email().required().trim().lowercase().messages({
      "string.base": "Email must be a string",
      "string.empty": "Email is required",
      "string.email": "Invalid email format",
      "any.required": "Email is required",
    }),
    phone: Joi.number().required().integer().max(9999999999999).messages({
      "number.base": "Phone number must be a number",
      "number.empty": "Phone number is required",
      "number.integer": "Phone number must be an integer",
      "number.max": "Phone number should be under 13 digits",
      "any.required": "Phone number is required",
    }),
    brand: Joi.string().max(30).trim().messages({
      "string.base": "Brand must be a string",
      "string.empty": "Brand is required",
      "string.max": "Brand name should be under 30 Characters",
      "any.required": "Brand is required",
    }),
    jobTitle: Joi.string().max(30).trim().messages({
      "string.base": "Job title must be a string",
      "string.max": "Job Title name should be under 30 Characters",
    }),
    superAdmin: Joi.boolean().default(false),
    admin: Joi.boolean().default(false),
    permissions: Joi.array().items(Joi.number()).default([]), // Array of numbers
    active: Joi.boolean().default(true),
    outlet: Joi.string().messages({
      "string.base": "Outlet must be a string",
      "string.empty": "Outlet is required",
      "any.required": "Outlet is required",
    }),
  });

  // Validate the request body against the adminSchema
  const { error, value } = adminSchema.validate(input, { abortEarly: false });

  if (error) {
    // Create an array of validation error messages
    const validationErrors = error.details.map(
      (value: ValidationErrorItem) => value.message
    );

    throw new ApiError(
      ApiError.badRequest().status,
      validationErrors.join(", "),
      "ValidationError"
    );
  }

  return value;
};

export const validateAdminInputMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract the request body
    const { body } = req;

    // Validate the admin input using the adminValidator
    const validatedInput: AdminInput = adminValidator(body);

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.status).json(error.message);
    }

    // Respond with the custom error
    const err = ApiError.badRequest();
    return res.status(err.status).json(err.message);
  }
};

export default adminValidator;
