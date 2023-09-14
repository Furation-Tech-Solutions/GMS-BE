import Joi, { ValidationErrorItem } from "joi";
import ApiError from "@presentation/error-handling/api-error";
import { Request, Response, NextFunction } from "express";

interface OutletInput {
  brandLogo: string;
  outletName: string;
  email: string;
  phone: number;
  altPhone?: number;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: number;
  active: boolean;
  admins?: string[];
}

const outletValidator = function (input: OutletInput): OutletInput {
  const outletSchema = Joi.object<OutletInput>({
    brandLogo: Joi.string(),
    outletName: Joi.string().required().max(30).trim().messages({
      "string.base": "Brand name must be a string",
      "string.empty": "Brand name is required",
      "string.max": "Brand name should be under 30 characters",
      "string.trim": "Brand name should not contain leading or trailing spaces",
      "any.required": "Brand name is required",
    }),
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } })
      .lowercase()
      .messages({
        "string.base": "Email must be a string",
        "string.empty": "Email is required",
        "string.email": "Invalid email format",
        "any.required": "Email is required",
      }),
    phone: Joi.number().required().messages({
      "string.base": "Phone number must be a string",
      "string.empty": "Phone number is required",
      "string.length": "Phone number should be 10 digits",
      "string.pattern.base": "Phone number should contain only digits",
      "any.required": "Phone number is required",
    }),
    altPhone: Joi.number().messages({
      "string.base": "Alternate phone number must be a string",
      "string.length": "Alternate phone number should be 10 digits",
      "string.pattern.base":
        "Alternate phone number should contain only digits",
    }),
    address: Joi.string().required().max(120).messages({
      "string.base": "Address must be a string",
      "string.empty": "Address is required",
      "string.max": "Address should be under 120 characters",
      "any.required": "Address is required",
    }),
    city: Joi.string().required().max(30).messages({
      "string.base": "City must be a string",
      "string.empty": "City is required",
      "string.max": "City name should be under 30 characters",
      "any.required": "City is required",
    }),
    state: Joi.string().required().max(30).messages({
      "string.base": "State must be a string",
      "string.empty": "State is required",
      "string.max": "State name should be under 30 characters",
      "any.required": "State is required",
    }),
    country: Joi.string().required().max(20).messages({
      "string.base": "Country must be a string",
      "string.empty": "Country is required",
      "string.max": "Country name should be under 20 characters",
      "any.required": "Country is required",
    }),
    pincode: Joi.number().required().integer().positive().max(999999).messages({
      "number.base": "Pincode must be a number",
      "number.empty": "Pincode is required",
      "number.integer": "Pincode must be an integer",
      "number.positive": "Pincode must be a positive number",
      "number.max": "Pincode should be under 6 digits",
      "any.required": "Pincode is required",
    }),
    active: Joi.boolean().required(),
    admins: Joi.array().items(Joi.string()).messages({
      "array.base": "Admins must be an array",
      "any.required": "Admins is required",
    }),
  });

  const { error, value } = outletSchema.validate(input, { abortEarly: false });

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

export const validateOutletInputMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract the request body
    const { body } = req;

    // Validate the admin input using the adminValidator
    const validatedInput: OutletInput = outletValidator(body);

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

export default outletValidator;
