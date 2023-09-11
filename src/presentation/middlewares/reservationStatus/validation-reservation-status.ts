import Joi, { ValidationErrorItem } from "joi";
import ApiError from "@presentation/error-handling/api-error";
import { Request, Response, NextFunction } from "express";

// Define the input interface for ReservationStatus
interface ReservationStatusInput {
  statusName: string;
  iconInitials: string;
  color: string;
  classification: string;
  active: boolean;
  durationHolds?: number;
}

// Validator function that can handle both create and update
const reservationStatusValidator = (
  input: ReservationStatusInput,
  isUpdate: boolean = false
): ReservationStatusInput => {
  const reservationStatusSchema = Joi.object<ReservationStatusInput>({
    statusName: isUpdate
      ? Joi.string().max(30).trim().allow("").messages({
          "string.max": "Status name should be under 30 characters",
          "string.trim":
            "Status name should not contain leading or trailing spaces",
        })
      : Joi.string().required().max(30).trim().messages({
          "string.base": "Status name must be a string",
          "string.empty": "Status name is required",
          "string.max": "Status name should be under 30 characters",
          "string.trim":
            "Status name should not contain leading or trailing spaces",
          "any.required": "Status name is required",
        }),
    iconInitials: isUpdate
      ? Joi.string().trim().allow("").messages({
          "string.trim":
            "Icon initials should not contain leading or trailing spaces",
        })
      : Joi.string().required().trim().messages({
          "string.base": "Icon initials must be a string",
          "string.trim":
            "Icon initials should not contain leading or trailing spaces",
          "any.required": "Icon initials are required",
        }),
    color: isUpdate
      ? Joi.string().max(30).trim().allow("").messages({
          "string.max": "Color code should be under 30 characters",
          "string.trim":
            "Color code should not contain leading or trailing spaces",
        })
      : Joi.string().required().max(30).trim().messages({
          "string.base": "Color code must be a string",
          "string.empty": "Color code is required",
          "string.max": "Color code should be under 30 characters",
          "string.trim":
            "Color code should not contain leading or trailing spaces",
          "any.required": "Color code is required",
        }),
    classification: isUpdate
      ? Joi.string().valid("PRE_SERVICE", "IN_SERVICE").allow("").messages({
          "any.only": "Invalid classification value",
        })
      : Joi.string().valid("PRE_SERVICE", "IN_SERVICE").required().messages({
          "any.only": "Invalid classification value",
          "any.required": "Classification is required",
        }),
    active: isUpdate
      ? Joi.boolean().messages({
          "boolean.base": "Active must be a boolean",
        })
      : Joi.boolean().default(true).messages({
          "boolean.base": "Active must be a boolean",
        }),
    durationHolds: isUpdate
      ? Joi.number().messages({
          "number.base": "Duration in holds must be a number",
        })
      : Joi.number().optional().messages({
          "number.base": "Duration in holds must be a number",
        }),
  });

  const { error, value } = reservationStatusSchema.validate(input, {
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

export const validateReservationStatusInputMiddleware = (
  isUpdate: boolean = false
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract the request body
      const { body } = req;

      // Validate the reservation status input using the reservationStatusValidator
      const validatedInput: ReservationStatusInput = reservationStatusValidator(
        body,
        isUpdate
      );

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
};
