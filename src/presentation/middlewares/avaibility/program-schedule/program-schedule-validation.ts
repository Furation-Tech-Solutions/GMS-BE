import Joi, { ValidationError, ValidationErrorItem } from "joi";
import ApiError from "@presentation/error-handling/api-error";
import { Request, Response, NextFunction } from "express";
import { IShift } from "types/availibility/schema-type";



const programScheduleValidator = function (input: any) {
  // Define the adminSchema for input validation
  const programScheduleValidation = Joi.object({
    title: Joi.string().required().max(255).trim().messages({
      "string.base": "Title must be a string",
      "string.empty": "Title is required",
      "string.max": "Title should be under 255 characters",
      "any.required": "Title is required",
    }),
    startDate: Joi.date().required().iso().messages({
      "date.base": "Start date must be a valid date",
      "date.empty": "Start date is required",
      "any.required": "Start date is required",
    }),
    endDate: Joi.date().iso().when("startDate", {
      is: Joi.exist(),
      then: Joi.date().greater(Joi.ref("startDate")).messages({
        "date.base": "End date must be a valid date",
        "date.greater": "End date should be greater than the start date",
      }),
    }),
    daysOfWeek: Joi.array()
      .items(Joi.string())
      .min(1)
      .required()
      .messages({
        "array.base": "Days of the week must be an array",
        "array.min": "At least one day of the week must be selected",
        "any.required": "At least one day of the week must be selected",
      }),
    shifts: Joi.array()
      .items(
        Joi.string().valid("Breakfast", "Brunch", "Lunch", "Day", "Dinner", "Night")
      )
      .required()
      .messages({
        "array.base": "Shifts must be an array",
        "any.required": "At least one shift must be selected",
      }),
    cuisine: Joi.string().max(255).trim().messages({
      "string.base": "Cuisine must be a string",
      "string.max": "Cuisine should be under 255 characters",
    }),
    pricePoint: Joi.string().max(50).trim().messages({
      "string.base": "Price point must be a string",
      "string.max": "Price point should be under 50 characters",
    }),
    description: Joi.string().max(1000).trim().messages({
      "string.base": "Description must be a string",
      "string.max": "Description should be under 1000 characters",
    }),
    dressCode: Joi.string().max(255).trim().messages({
      "string.base": "Dress code must be a string",
      "string.max": "Dress code should be under 255 characters",
    }),
    tableHoldingPolicy: Joi.string().max(255).trim().messages({
      "string.base": "Table holding policy must be a string",
      "string.max": "Table holding policy should be under 255 characters",
    }),
    spendPolicy: Joi.string().max(255).trim().messages({
      "string.base": "Spend policy must be a string",
      "string.max": "Spend policy should be under 255 characters",
    }),
    childPolicy: Joi.string().max(255).trim().messages({
      "string.base": "Child policy must be a string",
      "string.max": "Child policy should be under 255 characters",
    }),
  });

  // Validate the request body against the adminSchema
  const { error, value } = programScheduleValidation.validate(input, { abortEarly: false });

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

export const validateProgramScheduleInputMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract the request body
    const { body } = req;

    // Validate the admin input using the adminValidator
    const validatedInput: IShift = programScheduleValidator(body);

    // Continue to the next middleware or route handler
    next();
  } catch (error: any) {
    if (error instanceof ApiError) {
      return res.status(error.status).json(error.message);
    }

    // Respond with the custom error
    const err = ApiError.badRequest();
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
};

export default programScheduleValidator;
