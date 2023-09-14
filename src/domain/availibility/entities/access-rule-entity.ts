import mongoose from "mongoose";

export class AccessRuleModel {
  constructor(
    public name: string = "",
    public startDate: Date = new Date(),
    public endDate: Date | undefined = undefined,
    public isIndefinite: boolean = false,
    public daysOfWeek: string[] = [],
    public timeSlots: string[] = [],
    public shiftCategories: string[] = [],
    public firstReservation: string | undefined = undefined,
    public lastReservation: string | undefined = undefined,
    public specificTime: string[] = [],
    public restrictShiftCategory: boolean | undefined = undefined,
    public partySize: {
      minPartySize: number;
      maxPartySize: number;
    } = {
        minPartySize: 2,
        maxPartySize: 12,
      },
    public seatingAreas: {
      SeatingAreaName: string[];
      exclusive: boolean;
    } | undefined = undefined,
    public guestFacingDisplay: {
      widgetTimeSlotDescription: string;
      timeSlotDescription: string;
      widgetTimeSlotDetail: {
        title: string;
        longDescription: string;
        image: string;
      };
      linkToOffer: string;
      allowBookingOnChannelsWithoutDisplayFields: boolean;
    } = {
        widgetTimeSlotDescription: "",
        timeSlotDescription: "",
        widgetTimeSlotDetail: {
          title: "",
          longDescription: "",
          image: "",
        },
        linkToOffer: "",
        allowBookingOnChannelsWithoutDisplayFields: false,
      },
    public paymentPolicy: {
      folllowShift: boolean;
      timeBeforeCutOff: number;
      bookingPolicy: string;
      policyDescription: string | undefined;
      allowCreditCard: boolean | undefined;
      bundleUpgrade: boolean;
    } = {
        folllowShift: false,
        timeBeforeCutOff: 60,
        bookingPolicy: 'Default Booking Policy',
        policyDescription: undefined,
        allowCreditCard: undefined,
        bundleUpgrade: false,
      },
    public bookingChannels: {
      AudienceTier: string[];
    }[] = [],
    public selectableUpgrade: {
      doNotInclude: boolean | undefined;
      include: boolean | undefined;
    } = {
        doNotInclude: undefined,
        include: undefined,
      },
    public reservationTags: mongoose.Schema.Types.ObjectId | undefined = undefined,
    public bookingWindow: {
      guestBookingStartTime: {
        value: number;
        unit: 'hours' | 'days' | 'weeks' | 'months' | 'reservation_time';
        reservationTime: string | undefined;
      };
      guestBookingCutoffTime: {
        value: number;
        unit: 'hours' | 'days' | 'weeks' | 'months' | 'reservation_time';
        reservationTime: string | undefined;
      };
    } = {
        guestBookingStartTime: {
          value: 90,
          unit: 'hours',
          reservationTime: undefined,
        },
        guestBookingCutoffTime: {
          value: 24,
          unit: 'hours',
          reservationTime: undefined,
        },
      },
    public maxReservationOrCoverLimit: {
      perDay: number;
      unit: 'Reservations' | 'Covers';
    } = {
        perDay: 0,
        unit: 'Reservations',
      },
    public pacing: {
      maxCoversPerSeatingInterval: number;
      customPacingPerSeatingInterval: {
        startTime: string;
        maxCovers: number;
      }[];
      totalPacingReduction: boolean;
    } = {
        maxCoversPerSeatingInterval: 0,
        customPacingPerSeatingInterval: [],
        totalPacingReduction: false,
      },
    public guestDurationPicker: {
      guestMustSpecifyDuration: boolean;
      durationMin: number;
      durationMax: number;
    } = {
        guestMustSpecifyDuration: false,
        durationMin: 0,
        durationMax: 60,
      }
  ) { }
}

export class AccessRuleEntity {
  constructor(
    public id: string | undefined = undefined,
    public name: string,
    public startDate: Date,
    public endDate: Date | undefined,
    public isIndefinite: boolean,
    public daysOfWeek: string[],
    public timeSlots: string[],
    public shiftCategories: string[],
    public firstReservation: string | undefined,
    public lastReservation: string | undefined,
    public specificTime: string[],
    public restrictShiftCategory: boolean | undefined,
    public partySize: {
      minPartySize: number;
      maxPartySize: number;
    },
    public seatingAreas: {
      SeatingAreaName: string[];
      exclusive: boolean;
    } | undefined,
    public guestFacingDisplay: {
      widgetTimeSlotDescription: string;
      timeSlotDescription: string;
      widgetTimeSlotDetail: {
        title: string;
        longDescription: string;
        image: string;
      };
      linkToOffer: string;
      allowBookingOnChannelsWithoutDisplayFields: boolean;
    },
    public paymentPolicy: {
      folllowShift: boolean;
      timeBeforeCutOff: number;
      bookingPolicy: string;
      policyDescription: string | undefined;
      allowCreditCard: boolean | undefined;
      bundleUpgrade: boolean;
    },
    public bookingChannels: {
      AudienceTier: string[];
    }[],
    public selectableUpgrade: {
      doNotInclude: boolean | undefined;
      include: boolean | undefined;
    },
    public reservationTags: mongoose.Schema.Types.ObjectId | undefined,
    public bookingWindow: {
      guestBookingStartTime: {
        value: number;
        unit: 'hours' | 'days' | 'weeks' | 'months' | 'reservation_time';
        reservationTime: string | undefined;
      };
      guestBookingCutoffTime: {
        value: number;
        unit: 'hours' | 'days' | 'weeks' | 'months' | 'reservation_time';
        reservationTime: string | undefined;
      };
    },
    public maxReservationOrCoverLimit: {
      perDay: number;
      unit: 'Reservations' | 'Covers';
    },
    public pacing: {
      maxCoversPerSeatingInterval: number;
      customPacingPerSeatingInterval: {
        startTime: string;
        maxCovers: number;
      }[];
      totalPacingReduction: boolean;
    },
    public guestDurationPicker: {
      guestMustSpecifyDuration: boolean;
      durationMin: number;
      durationMax: number;
    }
  ) {}
}



export class AccessRuleMapper {
  static toEntity(
    accessRuleData: any,
    includeId?: boolean,
    existingAccessRule?: AccessRuleEntity | null
  ): AccessRuleEntity {
    if (existingAccessRule != null) {
      return {
        ...existingAccessRule,
        id: includeId
          ? accessRuleData.id !== undefined
            ? accessRuleData.id
            : existingAccessRule.id
          : existingAccessRule.id,
        name:
          accessRuleData.name !== undefined
            ? accessRuleData.name
            : existingAccessRule.name,
        startDate:
          accessRuleData.startDate !== undefined
            ? accessRuleData.startDate
            : existingAccessRule.startDate,
        endDate:
          accessRuleData.endDate !== undefined
            ? accessRuleData.endDate
            : existingAccessRule.endDate,
        isIndefinite:
          accessRuleData.isIndefinite !== undefined
            ? accessRuleData.isIndefinite
            : existingAccessRule.isIndefinite,
        daysOfWeek:
          accessRuleData.daysOfWeek !== undefined
            ? accessRuleData.daysOfWeek
            : existingAccessRule.daysOfWeek,
        timeSlots:
          accessRuleData.timeSlots !== undefined
            ? accessRuleData.timeSlots
            : existingAccessRule.timeSlots,
        shiftCategories:
          accessRuleData.shiftCategories !== undefined
            ? accessRuleData.shiftCategories
            : existingAccessRule.shiftCategories,
        firstReservation:
          accessRuleData.firstReservation !== undefined
            ? accessRuleData.firstReservation
            : existingAccessRule.firstReservation,
        lastReservation:
          accessRuleData.lastReservation !== undefined
            ? accessRuleData.lastReservation
            : existingAccessRule.lastReservation,
        specificTime:
          accessRuleData.specificTime !== undefined
            ? accessRuleData.specificTime
            : existingAccessRule.specificTime,
        restrictShiftCategory:
          accessRuleData.restrictShiftCategory !== undefined
            ? accessRuleData.restrictShiftCategory
            : existingAccessRule.restrictShiftCategory,
        partySize:
          accessRuleData.partySize !== undefined
            ? accessRuleData.partySize
            : existingAccessRule.partySize,
        seatingAreas:
          accessRuleData.seatingAreas !== undefined
            ? accessRuleData.seatingAreas
            : existingAccessRule.seatingAreas,
        guestFacingDisplay:
          accessRuleData.guestFacingDisplay !== undefined
            ? accessRuleData.guestFacingDisplay
            : existingAccessRule.guestFacingDisplay,
        paymentPolicy:
          accessRuleData.paymentPolicy !== undefined
            ? accessRuleData.paymentPolicy
            : existingAccessRule.paymentPolicy,
        bookingChannels:
          accessRuleData.bookingChannels !== undefined
            ? accessRuleData.bookingChannels
            : existingAccessRule.bookingChannels,
        selectableUpgrade:
          accessRuleData.selectableUpgrade !== undefined
            ? accessRuleData.selectableUpgrade
            : existingAccessRule.selectableUpgrade,
        reservationTags:
          accessRuleData.reservationTags !== undefined
            ? accessRuleData.reservationTags
            : existingAccessRule.reservationTags,
        bookingWindow:
          accessRuleData.bookingWindow !== undefined
            ? accessRuleData.bookingWindow
            : existingAccessRule.bookingWindow,
        maxReservationOrCoverLimit:
          accessRuleData.maxReservationOrCoverLimit !== undefined
            ? accessRuleData.maxReservationOrCoverLimit
            : existingAccessRule.maxReservationOrCoverLimit,
        pacing:
          accessRuleData.pacing !== undefined
            ? accessRuleData.pacing
            : existingAccessRule.pacing,
        guestDurationPicker:
          accessRuleData.guestDurationPicker !== undefined
            ? accessRuleData.guestDurationPicker
            : existingAccessRule.guestDurationPicker,
      };
    } else {
      const accessRuleEntity: AccessRuleEntity = {
        id: includeId
          ? accessRuleData.id !== undefined
            ? accessRuleData.id
            : undefined
          : undefined,
        name: accessRuleData.name,
        startDate: accessRuleData.startDate,
        endDate: accessRuleData.endDate,
        isIndefinite: accessRuleData.isIndefinite,
        daysOfWeek: accessRuleData.daysOfWeek,
        timeSlots: accessRuleData.timeSlots,
        shiftCategories: accessRuleData.shiftCategories,
        firstReservation: accessRuleData.firstReservation,
        lastReservation: accessRuleData.lastReservation,
        specificTime: accessRuleData.specificTime,
        restrictShiftCategory: accessRuleData.restrictShiftCategory,
        partySize: accessRuleData.partySize,
        seatingAreas: accessRuleData.seatingAreas,
        guestFacingDisplay: accessRuleData.guestFacingDisplay,
        paymentPolicy: accessRuleData.paymentPolicy,
        bookingChannels: accessRuleData.bookingChannels,
        selectableUpgrade: accessRuleData.selectableUpgrade,
        reservationTags: accessRuleData.reservationTags,
        bookingWindow: accessRuleData.bookingWindow,
        maxReservationOrCoverLimit: accessRuleData.maxReservationOrCoverLimit,
        pacing: accessRuleData.pacing,
        guestDurationPicker: accessRuleData.guestDurationPicker,
      };
      return accessRuleEntity;
    }
  }

  static toModel(accessRule: AccessRuleEntity): AccessRuleModel {
    return {
      name: accessRule.name,
      startDate: accessRule.startDate,
      endDate: accessRule.endDate,
      isIndefinite: accessRule.isIndefinite,
      daysOfWeek: accessRule.daysOfWeek,
      timeSlots: accessRule.timeSlots,
      shiftCategories: accessRule.shiftCategories,
      firstReservation: accessRule.firstReservation,
      lastReservation: accessRule.lastReservation,
      specificTime: accessRule.specificTime,
      restrictShiftCategory: accessRule.restrictShiftCategory,
      partySize: accessRule.partySize,
      seatingAreas: accessRule.seatingAreas,
      guestFacingDisplay: accessRule.guestFacingDisplay,
      paymentPolicy: accessRule.paymentPolicy,
      bookingChannels: accessRule.bookingChannels,
      selectableUpgrade: accessRule.selectableUpgrade,
      reservationTags: accessRule.reservationTags,
      bookingWindow: accessRule.bookingWindow,
      maxReservationOrCoverLimit: accessRule.maxReservationOrCoverLimit,
      pacing: accessRule.pacing,
      guestDurationPicker: accessRule.guestDurationPicker,
    };
  }
}
