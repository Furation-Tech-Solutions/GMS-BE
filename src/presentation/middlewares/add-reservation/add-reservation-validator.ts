import Joi, { ValidationErrorItem } from "joi";
import ApiError from "@presentation/error-handling/api-error";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

interface ReservationInput {
  date: Date;
  noOfGuests: number;
  shift: string;
  seatingArea: string;
  timeSlot: string;
  client: string;
  table: string;
  duration: string;
  reservationTags?: string[];
  reservationNote?: string;
  bookedBy?: { _id: mongoose.Schema.Types.ObjectId; name: string };
  perks?: string;
  updatedBy?: string;
  createdBy?: string;
  confirmationMailSending?: boolean;
}

// Define a pattern for MongoDB ObjectId (24 hexadecimal characters)
const objectIdPattern = /^[0-9a-fA-F]{24}$/;

const reservationValidator = (
  input: ReservationInput,
  isUpdate: boolean = false
) => {
  const baseSchema = {
    date: isUpdate
      ? Joi.date().iso().optional().messages({
          "any.required": "Please select a valid Date in ISO format",
          "date.iso": "Please select a valid Date in ISO format",
        })
      : Joi.date().iso().required().messages({
          "any.required": "Please select a valid Date in ISO format",
          "date.iso": "Please select a valid Date in ISO format",
        }),
    noOfGuests: isUpdate
      ? Joi.number().optional().messages({
          "any.required": "Please select the Number of Guests",
        })
      : Joi.number().required().default(1).messages({
          "any.required": "Please select the Number of Guests",
        }),
    shift: isUpdate
      ? Joi.string()
          .trim()
          .pattern(objectIdPattern, "MongoDB ObjectId")
          .optional()
          .messages({
            "any.required": "Please select the Shift",
          })
      : Joi.string()
          .trim()
          .pattern(objectIdPattern, "MongoDB ObjectId")
          .required()
          .messages({
            "any.required": "Please select the Shift",
          }),
    seatingArea: isUpdate
      ? Joi.string()
          .trim()
          .pattern(objectIdPattern, "MongoDB ObjectId")
          .optional()
          .messages({
            "any.required": "Please select the Seating Area",
          })
      : Joi.string()
          .trim()
          .pattern(objectIdPattern, "MongoDB ObjectId")
          .required()
          .messages({
            "any.required": "Please select the Seating Area",
          }),
    timeSlot: isUpdate
      ? Joi.string()
          .trim()
          // .regex(/^\d{2}:\d{2}$/)
          .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9] (AM|PM)$/)
          .optional()
          .messages({
            "string.pattern.base":
              "Time Slot should be in the format 'HH:mm AM/PM'",
          })
      : Joi.string()
          .trim()
          // .regex(/^\d{2}:\d{2}$/)
          .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9] (AM|PM)$/)
          .required()
          .messages({
            "any.required": "Please select the Time Slot",
            "string.pattern.base":
              "Time Slot should be in the format 'HH:mm AM/PM'",
          }),
    client: isUpdate
      ? Joi.string()
          .trim()
          .pattern(objectIdPattern, "MongoDB ObjectId")
          .optional()
          .messages({
            "any.required": "Please select the Client",
          })
      : Joi.string()
          .trim()
          .pattern(objectIdPattern, "MongoDB ObjectId")
          .required()
          .messages({
            "any.required": "Please select the Client",
          }),
    table: isUpdate
      ? Joi.string()
          .trim()
          .pattern(objectIdPattern, "MongoDB ObjectId")
          .optional()
          .messages({
            "any.required": "Please select the Table",
          })
      : Joi.string()
          .trim()
          .pattern(objectIdPattern, "MongoDB ObjectId")
          .required()
          .messages({
            "any.required": "Please select the Table",
          }),
    duration: isUpdate
      ? Joi.string()
          .regex(/^\d{2}:\d{2}:\d{2}$/)
          .trim()
          .optional()
      : Joi.string()
          .regex(/^\d{2}:\d{2}:\d{2}$/)
          .trim()
          .required()
          .default("02:00:00")
          .messages({
            "any.required": "Duration is required",
            "string.pattern.base": "Duration should be in HH:mm:ss format",
          }),
    reservationTags: isUpdate
      ? Joi.array().items(
          Joi.string()
            .trim()
            .pattern(objectIdPattern, "MongoDB ObjectId")
            .optional()
            .messages({
              "string.pattern.base": "Invalid MongoDB ObjectId",
            })
        )
      : Joi.array().items(
          Joi.string()
            .trim()
            .pattern(objectIdPattern, "MongoDB ObjectId")
            .required()
            .messages({
              "any.required": "Please provide a valid MongoDB ObjectId",
              "string.pattern.base": "Invalid MongoDB ObjectId",
            })
        ),
    reservationNote: Joi.string().max(2000).min(1).trim().optional().messages({
      "string.max": "Reservation note should have less than 2000 characters",
      "string.min": "Reservation note should have more than 1 character",
    }),
    bookedBy: isUpdate
      ? Joi.object({
          _id: Joi.string()
            .trim()
            .pattern(objectIdPattern, "MongoDB ObjectId")
            .optional()
            .messages({
              "any.required": "Please specify _id in bookedBy",
            }),
          name: Joi.string().trim().optional().messages({
            "any.required": "Please specify name in bookedBy",
          }),
        })
      : Joi.object({
          _id: Joi.string()
            .trim()
            .pattern(objectIdPattern, "MongoDB ObjectId")
            .required()
            .messages({
              "any.required": "Please specify _id in bookedBy",
            }),
          name: Joi.string().trim().required().messages({
            "any.required": "Please specify name in bookedBy",
          }),
        }),
    perks: Joi.string().max(2000).min(5).trim().optional().messages({
      "string.max": "Perks should have less than 2000 characters",
      "string.min": "Perks should have at least 5 characters",
    }),
    updatedBy: isUpdate
      ? Joi.string()
          .trim()
          .pattern(objectIdPattern, "MongoDB ObjectId")
          .optional()
          .messages({
            "any.required": "Please select the Updated By",
          })
      : Joi.string()
          .trim()
          .pattern(objectIdPattern, "MongoDB ObjectId")
          .optional()
          .messages({
            "any.required": "Please select the Update By",
          }),
    createdBy: isUpdate
      ? Joi.string()
          .trim()
          .pattern(objectIdPattern, "MongoDB ObjectId")
          .optional()
          .messages({
            "any.required": "Please select the Created By",
          })
      : Joi.string()
          .trim()
          .pattern(objectIdPattern, "MongoDB ObjectId")
          .optional()
          .messages({
            "any.required": "Please select the Created By",
          }),
    confirmationMailSending: Joi.boolean().optional(),
  };

  const { error, value } = Joi.object(baseSchema).validate(input, {
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

export const validateReservationInputMiddleware = (
  isUpdate: boolean = false
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract the request body
      const { body } = req;

      // Validate the reservation input using the reservationValidator
      const validatedInput: ReservationInput = reservationValidator(
        body,
        isUpdate
      );

      // Continue to the next middleware or route handler
      next();
    } catch (error: any) {
      // if (error instanceof ApiError) {
      //   return res.status(500).json({ error: error.message });
      // }

      // Respond with the custom error
      // const err = ApiError.badRequest();
      return res.status(400).json({ error: error.message });
    }
  };
};
