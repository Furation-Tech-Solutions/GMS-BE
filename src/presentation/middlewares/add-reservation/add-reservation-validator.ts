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
  reservationStatus?: string;
  bookedBy?: string;
  serverName?: string;
  perks?: string;
  prePayment?: number;
  onSitePayment?: number;
  outletId?: string;
  updatedBy?: string | null;
  createdBy?: string | null;
  confirmationMailSending?: boolean;
}

// Define a pattern for MongoDB ObjectId (24 hexadecimal characters)
export const objectIdPattern = /^[0-9a-fA-F]{24}$/;

const reservationValidator = (
  input: ReservationInput,
  isUpdate: boolean = false
) => {
  const baseSchema = {
    date: isUpdate
      ? Joi.date().iso().optional().messages({
          "any.required": "Please select a valid Date in ISO format",
          "date.invalid": "Please select a valid Date",
        })
      : Joi.date().iso().required().messages({
          "string.isoDate": "Please select a valid Date in ISO format",
          "date.invalid": "Please select a valid Date",
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
          .pattern(new RegExp(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/))
          .optional()
          .messages({
            "string.pattern.base":
              "Time Slot should be in the format 'HH:mm:ss'",
          })
      : Joi.string()
          .trim()
          .pattern(new RegExp(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/))
          .required()
          .messages({
            "any.required": "Please select the Time Slot",
            "string.pattern.base":
              "Time Slot should be in the format 'HH:mm:ss'",
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
          .optional()
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
    reservationNote: Joi.string()
      .max(2000)
      .trim()
      .default("")
      .optional()
      .allow("")
      .messages({
        "string.max": "Reservation note should have less than 2000 characters",
      }),
    reservationStatus: Joi.string()
      .trim()
      .default("upcoming")
      .optional()
      .messages({
        string: "Please fill Reservtion Status",
      }),
    bookedBy: isUpdate
      ? Joi.string().trim().allow("").optional().messages({
          "any.required": "Please specify name in bookedBy",
        })
      : Joi.string().trim().allow("").optional().messages({
          "any.required": "Please specify name in bookedBy",
        }),
    serverName: isUpdate
      ? Joi.string().trim().allow("").optional().messages({
          "any.required": "Please specify name in server name",
        })
      : Joi.string().trim().allow("").optional().messages({
          "any.required": "Please specify name in server name",
        }),
    // bookedBy: isUpdate
    //   ? Joi.object({
    //       _id: Joi.string()
    //         .trim()
    //         .pattern(objectIdPattern, "MongoDB ObjectId")
    //         .optional()
    //         .messages({
    //           "any.required": "Please specify _id in bookedBy",
    //         }),
    //       name: Joi.string().trim().optional().messages({
    //         "any.required": "Please specify name in bookedBy",
    //       }),
    //     })
    //   : Joi.object({
    //       _id: Joi.string()
    //         .trim()
    //         .pattern(objectIdPattern, "MongoDB ObjectId")
    //         .required()
    //         .default("651164b63d20dce2ae531ac5")
    //         .messages({
    //           "any.required": "Please specify _id in bookedBy",
    //         }),
    //       name: Joi.string().trim().required().default("Shiva").messages({
    //         "any.required": "Please specify name in bookedBy",
    //       }),
    //     }),
    perks: Joi.string()
      .max(2000)
      .trim()
      .default("")
      .optional()
      .allow("")
      .messages({
        "string.max": "Perks should have less than 2000 characters",
      }),
    outletId: isUpdate
      ? Joi.string()
          .trim()
          .pattern(objectIdPattern, "MongoDB ObjectId")
          .optional()
          .messages({
            "any.required": "Please select the outlet id",
          })
      : Joi.string()
          .trim()
          .pattern(objectIdPattern, "MongoDB ObjectId")
          .optional()
          .allow("")
          .messages({
            "any.required": "Please select the outlet id",
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
          .default("65116a3e13633df078698e90")
          .messages({
            "any.required": "Please select the Update By",
          }),
    prePayment: isUpdate
      ? Joi.number().optional().default(0).messages({
          "any.required": "Please fill the Pre Payment",
        })
      : Joi.number().optional().default(0).messages({
          "any.required": "Please fill the Pre Payment",
        }),
    onSitePayment: isUpdate
      ? Joi.number().optional().default(0).messages({
          "any.required": "Please fill the onsite Payment ",
        })
      : Joi.number().optional().default(0).messages({
          "any.required": "Please fill the onsite Payment",
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
          .default("65116a3e13633df078698e90")
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
