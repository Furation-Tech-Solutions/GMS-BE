import { IShift } from "types/availibility/schema-type";

export class ShiftModel implements IShift {
  constructor(
    public shiftName: string = "",
    public shiftCategory: 'breakfast' | 'brunch' | 'lunch' | 'day' | 'dinner' | 'night' = 'breakfast',
    public startDate: string = '',
    public endDate: string | null = null,
    public daysToRepeatThisShift: string[] = [],
    public firstSeating: string = '',
    public lastSeating: string = '',
    public timeInterval: 15 | 30 | 60 = 15,
    public floorPlanLayout: string = "default",
    public seatingAreasAvailable: ('Restaurant' | 'Bar' | 'SushiBar' | 'Prive' | 'PriveBar')[] = [],
    public howFarInAdvanceCanReservationsBeBookedInternally:
      | { value?: number; unit: 'Indefinitely'; reservationTime?: string }
      | { value?: number; unit: 'HoursInAdvance'; reservationTime?: string }
      | { value?: number; unit: 'DaysInAdvance'; reservationTime?: string }
      | { value?: number; unit: 'WeeksInAdvance'; reservationTime?: string }
      | { value?: number; unit: 'MonthsInAdvance'; reservationTime?: string } = { unit: 'Indefinitely' },
    public partySizeMin: number = 1,
    public partySizeMax: number = 30,
    public enforceForUsersWithoutPartySizeOverbookingPermission: boolean = false,
    public durationAverageTurnTimeBasedOnPartySize: { partySize: number; duration: number }[] = [],
    public pacing: number = 0,
    public setMaximumTotalCoversForShift: string | undefined = undefined,
    public allowDoubleBookingOnSameTables: boolean = false,
    public modifyBookingNotification: 'At Any Time' = 'At Any Time',
    public timeBeforeCutOff:
      | { value?: number; unit: 'Indefinitely'; reservationTime?: string }
      | { value?: number; unit: 'HoursInAdvance'; reservationTime?: string }
      | { value?: number; unit: 'DaysInAdvance'; reservationTime?: string }
      | { value?: number; unit: 'WeeksInAdvance'; reservationTime?: string }
      | { value?: number; unit: 'MonthsInAdvance'; reservationTime?: string },
    public bookingPolicy: 'Default Booking Policy' | 'Custom Policy' = 'Default Booking Policy',
    public policyDescription: string | undefined = undefined,
    public addSelectableUpgrades: boolean = false,
  ) {}
}

  export class ShiftEntity {
    constructor(
      public id: string | undefined = undefined,
      public shiftName: string,
      public shiftCategory: 'breakfast' | 'brunch' | 'lunch' | 'day' | 'dinner' | 'night',
      public startDate: string,
      public endDate: string | null,
      public daysToRepeatThisShift: string[],
      public firstSeating: string,
      public lastSeating: string,
      public timeInterval: 15 | 30 | 60,
      public floorPlanLayout: string,
      public seatingAreasAvailable: ('Restaurant' | 'Bar' | 'SushiBar' | 'Prive' | 'PriveBar')[],
      public howFarInAdvanceCanReservationsBeBookedInternally:
      | { value?: number; unit: 'Indefinitely'; reservationTime?: string }
      | { value?: number; unit: 'HoursInAdvance'; reservationTime?: string }
      | { value?: number; unit: 'DaysInAdvance'; reservationTime?: string }
      | { value?: number; unit: 'WeeksInAdvance'; reservationTime?: string }
      | { value?: number; unit: 'MonthsInAdvance'; reservationTime?: string } =  { unit: 'Indefinitely' },
      public partySizeMin: number,
      public partySizeMax: number,
      public enforceForUsersWithoutPartySizeOverbookingPermission: boolean,
      public durationAverageTurnTimeBasedOnPartySize: { partySize: number; duration: number }[],
      public pacing: number,
      public setMaximumTotalCoversForShift: string,
      public allowDoubleBookingOnSameTables: boolean,
      public modifyBookingNotification: 'At Any Time' | 'Never' | 'Up Until Cut-off Time' = 'At Any Time',
      public timeBeforeCutOff:
      | { value?: number; unit: 'Indefinitely'; reservationTime?: string }
      | { value?: number; unit: 'HoursInAdvance'; reservationTime?: string }
      | { value?: number; unit: 'DaysInAdvance'; reservationTime?: string }
      | { value?: number; unit: 'WeeksInAdvance'; reservationTime?: string }
      | { value?: number; unit: 'MonthsInAdvance'; reservationTime?: string },
      public bookingPolicy: 'Default Booking Policy' | 'Custom Policy',
      public policyDescription: string ,
      public addSelectableUpgrades: boolean,
    ) {}
  }




export class ShiftMapper {
  static toEntity(
    shiftData: any,
    includeId?: boolean,
    existingShift?: ShiftEntity | null
  ): ShiftEntity {
    if (existingShift != null) {
      return {
        ...existingShift,
        shiftName:
          shiftData.shiftName !== undefined
            ? shiftData.shiftName
            : existingShift.shiftName,
        shiftCategory:
          shiftData.shiftCategory !== undefined
            ? shiftData.shiftCategory
            : existingShift.shiftCategory,
        startDate:
          shiftData.startDate !== undefined
            ? shiftData.startDate
            : existingShift.startDate,
        endDate:
          shiftData.endDate !== undefined
            ? shiftData.endDate
            : existingShift.endDate,
        daysToRepeatThisShift:
          shiftData.daysToRepeatThisShift !== undefined
            ? shiftData.daysToRepeatThisShift
            : existingShift.daysToRepeatThisShift,
        firstSeating:
          shiftData.firstSeating !== undefined
            ? shiftData.firstSeating
            : existingShift.firstSeating,
        lastSeating:
          shiftData.lastSeating !== undefined
            ? shiftData.lastSeating
            : existingShift.lastSeating,
        timeInterval:
          shiftData.timeInterval !== undefined
            ? shiftData.timeInterval
            : existingShift.timeInterval,
        floorPlanLayout:
          shiftData.floorPlanLayout !== undefined
            ? shiftData.floorPlanLayout
            : existingShift.floorPlanLayout,
        seatingAreasAvailable:
          shiftData.seatingAreasAvailable !== undefined
            ? shiftData.seatingAreasAvailable
            : existingShift.seatingAreasAvailable,
        howFarInAdvanceCanReservationsBeBookedInternally:
          shiftData.howFarInAdvanceCanReservationsBeBookedInternally !== undefined
            ? shiftData.howFarInAdvanceCanReservationsBeBookedInternally
            : existingShift.howFarInAdvanceCanReservationsBeBookedInternally,
        partySizeMin:
          shiftData.partySizeMin !== undefined
            ? shiftData.partySizeMin
            : existingShift.partySizeMin,
        partySizeMax:
          shiftData.partySizeMax !== undefined
            ? shiftData.partySizeMax
            : existingShift.partySizeMax,
        enforceForUsersWithoutPartySizeOverbookingPermission:
          shiftData.enforceForUsersWithoutPartySizeOverbookingPermission !== undefined
            ? shiftData.enforceForUsersWithoutPartySizeOverbookingPermission
            : existingShift.enforceForUsersWithoutPartySizeOverbookingPermission,
        durationAverageTurnTimeBasedOnPartySize:
          shiftData.durationAverageTurnTimeBasedOnPartySize !== undefined
            ? shiftData.durationAverageTurnTimeBasedOnPartySize
            : existingShift.durationAverageTurnTimeBasedOnPartySize,
        pacing:
          shiftData.pacing !== undefined
            ? shiftData.pacing
            : existingShift.pacing,
        setMaximumTotalCoversForShift:
          shiftData.setMaximumTotalCoversForShift !== undefined
            ? shiftData.setMaximumTotalCoversForShift
            : existingShift.setMaximumTotalCoversForShift,
        allowDoubleBookingOnSameTables:
          shiftData.allowDoubleBookingOnSameTables !== undefined
            ? shiftData.allowDoubleBookingOnSameTables
            : existingShift.allowDoubleBookingOnSameTables,
        modifyBookingNotification:
          shiftData.modifyBookingNotification !== undefined
            ? shiftData.modifyBookingNotification
            : existingShift.modifyBookingNotification,
        timeBeforeCutOff:
          shiftData.timeBeforeCutOff !== undefined
            ? shiftData.timeBeforeCutOff
            : existingShift.timeBeforeCutOff,
        bookingPolicy:
          shiftData.bookingPolicy !== undefined
            ? shiftData.bookingPolicy
            : existingShift.bookingPolicy,
        policyDescription: 
        shiftData.policyDescription !== undefined
            ? shiftData.policyDescription
            : existingShift.policyDescription,
        addSelectableUpgrades:
          shiftData.addSelectableUpgrades !== undefined
            ? shiftData.addSelectableUpgrades
            : existingShift.addSelectableUpgrades,
      };
    } else {
      const shiftEntity: ShiftEntity = {
        id: includeId
          ? shiftData._id
            ? shiftData._id.toString()
            : undefined
          : undefined,
        shiftName: shiftData.shiftName,
        shiftCategory: shiftData.shiftCategory,
        startDate: shiftData.startDate,
        endDate: shiftData.endDate,
        daysToRepeatThisShift: shiftData.daysToRepeatThisShift,
        firstSeating: shiftData.firstSeating,
        lastSeating: shiftData.lastSeating,
        timeInterval: shiftData.timeInterval,
        floorPlanLayout: shiftData.floorPlanLayout,
        seatingAreasAvailable: shiftData.seatingAreasAvailable,
        howFarInAdvanceCanReservationsBeBookedInternally: shiftData.howFarInAdvanceCanReservationsBeBookedInternally,
        partySizeMin: shiftData.partySizeMin,
        partySizeMax: shiftData.partySizeMax,
        enforceForUsersWithoutPartySizeOverbookingPermission: shiftData.enforceForUsersWithoutPartySizeOverbookingPermission,
        durationAverageTurnTimeBasedOnPartySize: shiftData.durationAverageTurnTimeBasedOnPartySize,
        pacing: shiftData.pacing,
        setMaximumTotalCoversForShift: shiftData.setMaximumTotalCoversForShift,
        allowDoubleBookingOnSameTables: shiftData.allowDoubleBookingOnSameTables,
        modifyBookingNotification: shiftData.modifyBookingNotification,
        timeBeforeCutOff: shiftData.timeBeforeCutOff,
        bookingPolicy: shiftData.bookingPolicy,
        policyDescription: shiftData.bookingPolicy,
        addSelectableUpgrades: shiftData.addSelectableUpgrades,
      };
      return shiftEntity;
    }
  }

  static toModel(shift: ShiftEntity): ShiftModel {
    return {
      shiftName: shift.shiftName,
      shiftCategory: shift.shiftCategory,
      startDate: shift.startDate,
      endDate: shift.endDate,
      daysToRepeatThisShift: shift.daysToRepeatThisShift,
      firstSeating: shift.firstSeating,
      lastSeating: shift.lastSeating,
      timeInterval: shift.timeInterval,
      floorPlanLayout: shift.floorPlanLayout,
      seatingAreasAvailable: shift.seatingAreasAvailable,
      howFarInAdvanceCanReservationsBeBookedInternally: shift.howFarInAdvanceCanReservationsBeBookedInternally ,
      partySizeMin: shift.partySizeMin,
      partySizeMax: shift.partySizeMax,
      enforceForUsersWithoutPartySizeOverbookingPermission: shift.enforceForUsersWithoutPartySizeOverbookingPermission,
      durationAverageTurnTimeBasedOnPartySize: shift.durationAverageTurnTimeBasedOnPartySize,
      pacing: shift.pacing,
      setMaximumTotalCoversForShift: shift.setMaximumTotalCoversForShift,
      allowDoubleBookingOnSameTables: shift.allowDoubleBookingOnSameTables,
      modifyBookingNotification: shift.modifyBookingNotification as "At Any Time",
      timeBeforeCutOff: shift.timeBeforeCutOff,
      bookingPolicy: shift.bookingPolicy,
      policyDescription: shift.bookingPolicy,
      addSelectableUpgrades: shift.addSelectableUpgrades,
    };
  }
}
