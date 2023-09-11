import Joi, { ValidationError, ValidationErrorItem } from "joi";
import ApiError from "@presentation/error-handling/api-error";
import { Request, Response, NextFunction } from "express";
import { IShift } from "types/availibility/schema-type";

const durationAverageTurnTimeSchemaJoi = Joi.object({
    partySize: Joi.number().required(),
    duration: Joi.number().required(),
  });

const shiftValidator = function (input: IShift): IShift {
  // Define the adminSchema for input validation
  const shiftPropertySchemaJoi = Joi.object<IShift>({
    shiftName: Joi.string().required().max(30).label('Shift Name'),
    shiftCategory: Joi.string().valid('breakfast', 'brunch', 'lunch', 'day', 'dinner', 'night').required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().allow(null), // Allow null as a default value for indefinite end date
    daysToRepeatThisShift: Joi.array().items(Joi.string().valid(
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    )).default([]),
    firstSeating: Joi.date().required(),
    lastSeating: Joi.date().required(),
    timeInterval: Joi.number().valid(15, 30, 60).required().label('Time Interval'),
    floorPlanLayout: Joi.string().required().default('default'),
    seatingAreasAvailable: Joi.array().items(Joi.string().valid(
      'Restaurant', 'Bar', 'SushiBar', 'Prive', 'PriveBar'
    )).default([]),
    howFarInAdvanceCanReservationsBeBookedInternally: Joi.string().valid(
      'Indefinitely', 'HoursInAdvance', 'DaysInAdvance', 'WeeksInAdvance', 'MonthsInAdvance'
    ).default('Indefinitely'),
    partySizeMin: Joi.number().required().default(1),
    partySizeMax: Joi.number().required().default(30),
    enforceForUsersWithoutPartySizeOverbookingPermission: Joi.boolean().default(false),
    durationAverageTurnTimeBasedOnPartySize: Joi.array().items(durationAverageTurnTimeSchemaJoi)
      .min(1)
      .required()
      .label('Duration Average Turn Time Based On Party Size'),
    pacing: Joi.number().required(),
    setMaximumTotalCoversForShift: Joi.boolean().default(true),
    allowDoubleBookingOnSameTables: Joi.boolean().default(false),
    modifyBookingNotification: Joi.string().valid('At Any Time', 'Never', 'Up Until Cut-off Time')
      .default('At Any Time'),
    timeBeforeCutOff: Joi.number().default(60),
    bookingPolicy: Joi.string().valid('Default Booking Policy', 'Custom Policy'),
    addSelectableUpgrades: Joi.boolean().default(false),
  }).options({ abortEarly: false });

  // Validate the request body against the adminSchema
  const { error, value } = shiftPropertySchemaJoi.validate(input, { abortEarly: false });

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

    // Validate the admin input using the adminValidator
    const validatedInput: IShift = shiftValidator(body);

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

export default shiftValidator;
