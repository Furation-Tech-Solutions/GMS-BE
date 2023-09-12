import Joi, { ValidationErrorItem } from "joi";
import { Request, Response, NextFunction } from "express";
import ApiError from "@presentation/error-handling/api-error";

// Define the input interface for Room
interface RoomInput {
  abbreviation: string;
  roomName: string;
  listOrder: number;
}

const roomValidator = (
  input: RoomInput,
  isUpdate: boolean = false
): RoomInput => {
  const roomSchema = Joi.object<RoomInput>({
    abbreviation: isUpdate
      ? Joi.string()
          .regex(/^[A-Z]+$/)
          .max(30)
          .trim()
          .uppercase()
          .optional()
          .messages({
            "string.max": "Abbreviation should be under 30 characters",
            "string.trim":
              "Abbreviation should not contain leading or trailing spaces",
          })
      : Joi.string()
          .regex(/^[A-Z]+$/)
          .required()
          .max(30)
          .trim()
          .uppercase()
          .messages({
            "string.base": "Abbreviation must be a string",
            "string.empty": "Abbreviation is required",
            "string.max": "Abbreviation should be under 30 characters",
            "string.trim":
              "Abbreviation should not contain leading or trailing spaces",
            "any.required": "Abbreviation is required",
          }),
    roomName: isUpdate
      ? Joi.string().max(30).trim().optional().messages({
          "string.max": "Room name should be under 30 characters",
          "string.trim":
            "Room name should not contain leading or trailing spaces",
        })
      : Joi.string().required().max(30).trim().messages({
          "string.base": "Room name must be a string",
          "string.empty": "Room name is required",
          "string.max": "Room name should be under 30 characters",
          "string.trim":
            "Room name should not contain leading or trailing spaces",
          "any.required": "Room name is required",
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

  const { error, value } = roomSchema.validate(input, {
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

export const validateRoomInputMiddleware = (isUpdate: boolean = false) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract the request body
      const { body } = req;
      // Validate the Room input using the roomValidator
      const validatedInput: RoomInput = roomValidator(
        body as RoomInput, // Type assertion since Express body type may not match RoomInput exactly
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

export default validateRoomInputMiddleware;
