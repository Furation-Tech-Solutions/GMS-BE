import Joi, { ValidationErrorItem } from "joi";
import ApiError from "@presentation/error-handling/api-error";
import { Request, Response, NextFunction } from "express";

// Define the input interface for SeatingArea
interface SeatingAreaInput {
  abbreviation: string;
  seatingAreaName: string;
  listOrder: number;
}

const seatingAreaValidator = function (
  input: SeatingAreaInput,
  isUpdate: boolean = false
): SeatingAreaInput {
  const seatingAreaSchema = Joi.object<SeatingAreaInput>({
    abbreviation: isUpdate
      ? Joi.string()
          .regex(/^[A-Z]+$/)
          .max(30)
          .trim()
          .optional()
          .messages({
            "string.pattern.base":
              "Abbreviation should contain only uppercase letters",
            "string.max": "Abbreviation should be under 30 characters",
            "string.trim":
              "Abbreviation should not contain leading or trailing spaces",
          })
      : Joi.string()
          .regex(/^[A-Z]+$/)
          .required()
          .max(30)
          .trim()
          .messages({
            "string.pattern.base":
              "Abbreviation should contain only uppercase letters",
            "string.base": "Abbreviation must be a string",
            "string.empty": "Abbreviation is required",
            "string.max": "Abbreviation should be under 30 characters",
            "string.trim":
              "Abbreviation should not contain leading or trailing spaces",
            "any.required": "Abbreviation is required",
          }),
    seatingAreaName: isUpdate
      ? Joi.string().max(30).trim().optional().messages({
          "string.max": "Seating Area name should be under 30 characters",
          "string.trim":
            "Seating Area name should not contain leading or trailing spaces",
        })
      : Joi.string().required().max(30).trim().messages({
          "string.base": "Seating Area name must be a string",
          "string.empty": "Seating Area name is required",
          "string.max": "Seating Area name should be under 30 characters",
          "string.trim":
            "Seating Area name should not contain leading or trailing spaces",
          "any.required": "Seating Area name is required",
        }),
    listOrder: isUpdate
      ? Joi.number().messages({
          "number.base": "List order must be a number",
        })
      : Joi.number().required().messages({
          "number.base": "List order must be a number",
          "number.empty": "List order is required",
          "any.required": "List order is required",
        }),
  });

  const { error, value } = seatingAreaSchema.validate(input, {
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

export const validateSeatingAreaInputMiddleware = (
  isUpdate: boolean = false
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract the request body
      const { body } = req;
      // Validate the SeatingArea input using the seatingAreaValidator
      const validatedInput: SeatingAreaInput = seatingAreaValidator(
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

export default validateSeatingAreaInputMiddleware;
