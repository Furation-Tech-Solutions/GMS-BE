import Joi, { ValidationError, ValidationErrorItem } from "joi";
import ApiError from "@presentation/error-handling/api-error";
import { Request, Response, NextFunction } from "express";
import { IShift } from "types/availibility/schema-type";
import { objectIdPattern } from "@presentation/middlewares/add-reservation/add-reservation-validator";

const durationAverageTurnTimeSchemaJoi = Joi.object({
  partySize: Joi.number().required(),
  duration: Joi.number().required(),
});

const shiftValidator = function (input: IShift): IShift {
  // Define the schema for input validation
  const shiftPropertySchemaJoi = Joi.object<IShift>({
    shiftName: Joi.string()
      .required()
      .max(30)
      .regex(/^[a-zA-Z0-9\s]+$/) // Only allow alphanumeric characters and spaces
      .label("Shift Name")
      .messages({
        "string.base": "Shift Name must be a string",
        "string.empty": "Shift Name is required",
        "string.max": "Shift Name should be under 30 characters",
        "string.pattern.base":
          "Shift Name can only contain alphanumeric characters and spaces",
        "any.required": "Shift Name is required",
      }),

    shiftCategory: Joi.string()
      .valid(
        "breakfast",
        "brunch",
        "lunch",
        "day",
        "dinner",
        "night",
        "sundown"
      )
      .required()
      .label("Shift Category")
      .messages({
        "string.base": "Shift Category must be a string",
        "any.only": "Invalid Shift Category",
        "any.required": "Shift Category is required",
      }),

    startDate: Joi.string()
      .required()
      .isoDate() // Validate as ISO date
      .label("Start Date")
      .messages({
        "date.base": "Start Date must be a valid date",
        "date.empty": "Start Date is required",
        "any.required": "Start Date is required",
      }),

    endDate: Joi.string()
      .allow(null)
      .isoDate() // Validate as ISO date or null
      .label("End Date")
      .messages({
        "date.base": "End Date must be a valid date",
      }),

    daysToRepeatThisShift: Joi.array()
      .items(
        Joi.string().valid(
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        )
      )
      .default([])
      .label("Days to Repeat This Shift")
      .messages({
        "array.base": "Days to Repeat This Shift must be an array",
        "array.includes": "Invalid day of the week selected",
        "any.required": "At least one day of the week must be selected",
      }),

    firstSeating: Joi.string()
      .required()
      .pattern(new RegExp(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/))
      .label("First Seating")
      .messages({
        "string.base": "First Seating must be a string",
        "string.empty": "First Seating is required",
        // "string.pattern.base": "First Seating must be in HH:mm format",
        "any.required": "First Seating is required",
      }),

    lastSeating: Joi.string()
      .required()
      .pattern(new RegExp(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/))
      .label("Last Seating")
      .messages({
        "string.base": "Last Seating must be a string",
        "string.empty": "Last Seating is required",
        // "string.pattern.base": "Last Seating must be in HH:mm format",
        "any.required": "Last Seating is required",
      }),

    timeInterval: Joi.number()
      .valid(15, 30, 60)
      .required()
      .label("Time Interval")
      .messages({
        "number.base": "Time Interval must be a number",
        "number.empty": "Time Interval is required",
        "number.only": "Invalid Time Interval",
        "any.required": "Time Interval is required",
      }),

    floorPlanLayout: Joi.string()
      .required()
      .default("default")
      .label("Floor Plan Layout")
      .messages({
        "string.base": "Floor Plan Layout must be a string",
        "string.empty": "Floor Plan Layout is required",
        "any.required": "Floor Plan Layout is required",
      }),

    seatingAreasAvailable: Joi.array()
      .items(Joi.string())
      .default([])
      .label("Seating Areas Available")
      .messages({
        "array.base": "Seating Areas Available must be an array",
        "any.required": "Seating Areas Available is required",
      }),

    howFarInAdvanceCanReservationsBeBookedInternally: Joi.object({
      value: Joi.number().positive().required(),
      unit: Joi.string()
        .valid(
          "Indefinitely",
          "HoursInAdvance",
          "DaysInAdvance",
          "WeeksInAdvance",
          "MonthsInAdvance"
        )
        .required(),
      reservationTime: Joi.string().optional(),
    })
      .default({
        value: 0,
        unit: "Indefinitely",
        reservationTime: "",
      })
      .label("How Far in Advance Can Reservations Be Booked Internally")
      .messages({
        "object.base":
          "How Far in Advance Can Reservations Be Booked Internally must be an object",
        "object.empty":
          "How Far in Advance Can Reservations Be Booked Internally is required",
        "any.required":
          "How Far in Advance Can Reservations Be Booked Internally is required",
      }),

    partySizeMin: Joi.number()
      .required()
      .min(1) // Minimum party size should be 1
      // .max(Joi.ref('partySizeMax')) // Maximum party size should not exceed partySizeMax
      .label("Minimum Party Size")
      .messages({
        "number.base": "Minimum Party Size must be a number",
        "number.empty": "Minimum Party Size is required",
        "number.min": "Minimum Party Size should be at least 1",
        "number.max": "Minimum Party Size should not exceed Maximum Party Size",
        "any.required": "Minimum Party Size is required",
      }),

    partySizeMax: Joi.number()
      .required()
      // .min(Joi.ref('partySizeMin')) // Maximum party size should not be less than partySizeMin
      .label("Maximum Party Size")
      .messages({
        "number.base": "Maximum Party Size must be a number",
        "number.empty": "Maximum Party Size is required",
        "number.min":
          "Maximum Party Size should not be less than Minimum Party Size",
        "any.required": "Maximum Party Size is required",
      }),

    enforceForUsersWithoutPartySizeOverbookingPermission: Joi.boolean()
      .default(false)
      .label("Enforce for Users Without Party Size Overbooking Permission")
      .messages({
        "boolean.base":
          "Enforce for Users Without Party Size Overbooking Permission must be a boolean",
      }),

    durationAverageTurnTimeBasedOnPartySize: Joi.array()
      .items(durationAverageTurnTimeSchemaJoi)
      .min(1)
      .required()
      .label("Duration Average Turn Time Based On Party Size")
      .messages({
        "array.base":
          "Duration Average Turn Time Based On Party Size must be an array",
        "array.min": "At least one duration must be specified",
        "any.required": "At least one duration must be specified",
      }),

    pacing: Joi.number().required().positive().label("Pacing").messages({
      "number.base": "Pacing must be a number",
      "number.empty": "Pacing is required",
      "number.positive": "Pacing should be a positive number",
    }),

    setMaximumTotalCoversForShift: Joi.string()
      .allow(null) // Validate as string or null
      .label("Set Maximum Total Covers for Shift")
      .messages({
        "string.base": "Set Maximum Total Covers for Shift must be a string",
        "string.empty": "Set Maximum Total Covers for Shift can be empty",
      }),

    allowDoubleBookingOnSameTables: Joi.boolean()
      .default(false)
      .label("Allow Double Booking on Same Tables")
      .messages({
        "boolean.base": "Allow Double Booking on Same Tables must be a boolean",
      }),

    modifyBookingNotification: Joi.string()
      .valid("At Any Time", "Never", "Up Until Cut-off Time")
      .default("At Any Time")
      .label("Modify Booking Notification")
      .messages({
        "string.base": "Modify Booking Notification must be a string",
        "string.empty": "Modify Booking Notification can be empty",
        "any.only": "Invalid Modify Booking Notification",
      }),

    timeBeforeCutOff: Joi.object({
      value: Joi.number().positive().required(),
      unit: Joi.string()
        .valid(
          "Indefinitely",
          "HoursInAdvance",
          "DaysInAdvance",
          "WeeksInAdvance",
          "MonthsInAdvance"
        )
        .required(),
      reservationTime: Joi.string().optional(),
    })
      .default({
        value: 60,
        unit: "HoursInAdvance",
        reservationTime: "",
      })
      .label("Time Before Cut-off")
      .messages({
        "object.base": "Time Before Cut-off must be an object",
        "object.empty": "Time Before Cut-off can be empty",
        "any.required": "Time Before Cut-off is required",
      }),

    bookingPolicy: Joi.string()
      .valid("Default Booking Policy", "Custom Policy")
      .label("Booking Policy")
      .messages({
        "string.base": "Booking Policy must be a string",
        "any.only": "Invalid Booking Policy",
      }),

    policyDescription: Joi.string().label("Policy Description").messages({
      "string.base": "Policy Description must be a string",
    }),

    addSelectableUpgrades: Joi.boolean()
      .default(false)
      .label("Add Selectable Upgrades")
      .messages({
        "boolean.base": "Add Selectable Upgrades must be a boolean",
      }),
    outletId: Joi.string()
      .trim()
      .pattern(objectIdPattern, "MongoDB ObjectId")
      .optional()
      .allow("")
      .messages({
        "any.required": "Please select the outlet id",
      }),
    updatedBy: Joi.string().trim().optional().allow("").messages({
      "any.required": "Please select the Update By",
    }),
    createdBy: Joi.string().trim().optional().allow("").messages({
      "any.required": "Please select the Created By",
    }),
  }).options({ abortEarly: false });

  // Validate the request body against the schema
  const { error, value } = shiftPropertySchemaJoi.validate(input, {
    abortEarly: false,
  });

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

export const validateShiftInputMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract the request body
    const { body } = req;

    // Validate the input using the validator
    const validatedInput: IShift = shiftValidator(body);

    // Continue to the next middleware or route handler
    next();
  } catch (error: any) {
    // if (error instanceof ApiError) {
    //   return res.status(error.status).json(error.message);
    // }

    // // Respond with the custom error
    // const err = ApiError.badRequest();
    // return res.status(err.status).json(err.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default shiftValidator;
