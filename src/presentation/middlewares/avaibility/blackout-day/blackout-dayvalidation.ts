import Joi, { ValidationError, ValidationErrorItem } from "joi";
import ApiError from "@presentation/error-handling/api-error";
import { Request, Response, NextFunction } from "express";

const blackoutTypeValidation = Joi.object({
  reservation: Joi.boolean().default(false),
  guestList: Joi.boolean().default(false),
});

const blackoutDayValidator = function (input: any) {
  // Define the adminSchema for input validation
  const blackoutDayValidationJoi = Joi.object({
    date: Joi.string()
      .required()
      .regex(/^\d{4}-\d{2}-\d{2}$/) // Ensure date format (YYYY-MM-DD)
      .message("Date must be in YYYY-MM-DD format"),
    day: Joi.string().required().max(50).trim().messages({
      "string.base": "Day must be a string",
      "string.empty": "Day is required",
      "string.max": "Day should be under 50 characters",
      "any.required": "Day is required",
    }),
    description: Joi.string().required().max(255).trim().messages({
      "string.base": "Description must be a string",
      "string.empty": "Description is required",
      "string.max": "Description should be under 255 characters",
      "any.required": "Description is required",
    }),
    blackout: blackoutTypeValidation,
  });

  // Validate the request body against the adminSchema
  const { error, value } = blackoutDayValidationJoi.validate(input, { abortEarly: false });

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

export const validateBlackoutInputMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract the request body
    const { body } = req;

    // Validate the admin input using the adminValidator
    const validatedInput = blackoutDayValidator(body);

    // Continue to the next middleware or route handler
    next();
  } catch (error: any) {
    // if (error instanceof ApiError) {
    //   return res.status(error.status).json(error.message);
    // }

    // Respond with the custom error
    // const err = ApiError.badRequest();
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
};

export default blackoutDayValidator;
