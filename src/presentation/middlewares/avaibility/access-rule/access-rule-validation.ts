import Joi, { ValidationError, ValidationErrorItem } from "joi";
import ApiError from "@presentation/error-handling/api-error";
import { Request, Response, NextFunction } from "express";



const guestFacingSchemaJoi = Joi.object({
  widgetTimeSlotDescription: Joi.string(),
  timeSlotDescription: Joi.string(),
  title: Joi.string(),
  longDescription: Joi.string(),
  image: Joi.string(),
  linkToOffer: Joi.string(),
  allowBookingOnChannelsWithoutDisplayFields: Joi.boolean(),
});

const paymentPolicySchemaJoi = Joi.object({
  folllowShift: Joi.boolean(),
  timeBeforeCutOff: Joi.number().positive(),
  bookingPolicy: Joi.string().valid('Default Booking Policy', 'Custom Policy'),
  policyDescription: Joi.string(),
  allowCreditCard: Joi.boolean(),
  bundleUpgrade: Joi.boolean(),
});

const bookingChannelsSchemaJoi = Joi.object({
  AudienceTier: Joi.array().items(
    Joi.string().valid("Direct Booking Channels", "Third Party Booking Channels", "Waitlist")
  ),
  value: Joi.number(),
  unit: Joi.string().valid('hours', 'days', 'weeks', 'months', 'reservation_time'),
  reservationTime: Joi.string(),
});

const partySizeSchemaJoi = Joi.object({
  minPartySize: Joi.number(),
  maxPartySize: Joi.number(),
});

const seatingAreaSchemaJoi = Joi.object({
  SeatingAreaName: Joi.array().items(Joi.string().required()),
  exclusive: Joi.boolean(),
});

const customPacingPerSeatingIntervalSchemaJoi = Joi.object({
  startTime: Joi.string(),
  maxCovers: Joi.number(),
});

const bookingWindowSchemaJoi = Joi.object({
  guestBookingStartTime: Joi.object({
    value: Joi.number(),
    unit: Joi.string().valid('hours', 'days', 'weeks', 'months', 'reservation_time'),
    reservationTime: Joi.string(),
  }),
  guestBookingCutoffTime: Joi.object({
    value: Joi.number(),
    unit: Joi.string().valid('hours', 'days', 'weeks', 'months', 'reservation_time'),
    reservationTime: Joi.string(),
  }),
});

const maxReservationOrCoverLimitSchemaJoi = Joi.object({
  perDay: Joi.number(),
  unit: Joi.string().valid('Reservations', 'Covers'),
});


const accessRuleValidator = function (input: any): any {
  // Define the schema for input validation
  const accessRuleSchemaJoi = Joi.object({
    name: Joi.string().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string(),
    isIndefinite: Joi.boolean().default(false),
    daysOfWeek: Joi.array().items(Joi.string()).min(1).required(),
    timeSlots: Joi.array().items(
      Joi.string().valid("All Times During Shift Category", "Custom time range", "Specific time slot")
    ).required(),
    shiftCategories: Joi.array().items(
      Joi.string().valid("All Lunch Shift", "All Dinner Shifts", "Specific time slot")
    ),
    firstReservation: Joi.string(),
    lastReservation: Joi.string(),
    specificTime: Joi.array().items(Joi.string()),
    restrictShiftCategory: Joi.boolean(),
    partySize: partySizeSchemaJoi,
    seatingAreas: seatingAreaSchemaJoi,
    guestFacingDisplay: guestFacingSchemaJoi,
    paymentPolicy: paymentPolicySchemaJoi,
    bookingChannels: Joi.array().items(bookingChannelsSchemaJoi),
    selectableUpgrade: Joi.object({
      doNotInclude: Joi.boolean(),
      include: Joi.boolean(),
    }),
    reservationTags: Joi.array().items(Joi.string()),
    bookingWindow: bookingWindowSchemaJoi,
    maxReservationOrCoverLimit: maxReservationOrCoverLimitSchemaJoi,
    pacing: Joi.object({
      maxCoversPerSeatingInterval: Joi.number(),
      customPacingPerSeatingInterval: Joi.array().items(customPacingPerSeatingIntervalSchemaJoi),
      totalPacingReduction: Joi.boolean(),
    }),
    guestDurationPicker: Joi.object({
      guestMustSpecifyDuration: Joi.boolean().default(false),
      durationMin: Joi.number().default(0),
      durationMax: Joi.number().default(60),
    }),
  }).options({ abortEarly: false });
  

  // Validate the request body against the schema
  const { error, value } = accessRuleSchemaJoi.validate(input, { abortEarly: false });

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

export const validateAccessRuleInputMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract the request body
    const { body } = req;

    // Validate the input using the validator
    const validatedInput = accessRuleValidator(body);

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
      message: error.message
    })
  }
};

export default accessRuleValidator;
