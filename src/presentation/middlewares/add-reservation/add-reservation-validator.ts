import Joi, { ValidationErrorItem } from "joi";
import ApiError from "@presentation/error-handling/api-error";
import { Request, Response, NextFunction } from "express";

interface ReservationInput {
  date: string;
  noOfGuests: string;
  shift: string;
  duration: string;
  seatingArea: string;
  timeSlot: string;
  client: string;
  reservationTags: string[];
  reservationNote: string;
  table: string;
  bookedBy: string;
  perks: string;
  updatedBy: string;
  createdBy: string;
  confirmationMailSending: boolean;
  createdAt: Date;
}

const reservationValidator = (
  input: ReservationInput,
  isUpdate: boolean = false
) => {
  const baseSchema = {
    date: isUpdate
      ? Joi.string().trim().optional().messages({
          "any.required": "Please select the Date",
        })
      : Joi.string().trim().required().messages({
          "any.required": "Please select the Date",
        }),
    noOfGuests: isUpdate
      ? Joi.number().optional().messages({
          "any.required": "Please select the Number of Guests",
        })
      : Joi.number().required().default(1).messages({
          "any.required": "Please select the Number of Guests",
        }),
    shift: isUpdate
      ? Joi.string().trim().optional().messages({
          "any.required": "Please select the Shift",
        })
      : Joi.string().trim().required().messages({
          "any.required": "Please select the Shift",
        }),
    duration: Joi.string().trim().default("2 hr"),
    seatingArea: isUpdate
      ? Joi.string().trim().optional().messages({
          "any.required": "Please select the Seating Area",
        })
      : Joi.string().trim().required().messages({
          "any.required": "Please select the Seating Area",
        }),
    timeSlot: isUpdate
      ? Joi.string().trim().optional().messages({
          "any.required": "Please select the Time Slot",
        })
      : Joi.string().trim().required().messages({
          "any.required": "Please select the Time Slot",
        }),
    client: isUpdate
      ? Joi.string().trim().optional().messages({
          "any.required": "Please select the Client",
        })
      : Joi.string().trim().required().messages({
          "any.required": "Please select the Client",
        }),
    reservationTags: Joi.array().items(Joi.string().trim()),
    reservationNote: Joi.string().max(2000).min(1).trim().messages({
      "string.max": "Reservation note should have less than 2000 characters",
      "string.min": "Reservation note should have more than 1 character",
    }),
    table: isUpdate
      ? Joi.string().trim().optional().messages({
          "any.required": "Please select the Table",
        })
      : Joi.string().trim().required().messages({
          "any.required": "Please select the Table",
        }),
    bookedBy: Joi.string().trim(),
    perks: Joi.string().max(2000).min(5).trim().messages({
      "string.max": "Perks should have less than 2000 characters",
      "string.min": "Perks should have at least 5 characters",
    }),
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
    confirmationMailSending: Joi.boolean().default(false),
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
      return res.status(500).json({ error: error.message });
    }
  };
};
