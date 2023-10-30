export class CheckInCheckOutModel {
  constructor(
    public reservation: string = "",
    public client: string = "",
    public checkIn: string = "",
    public checkOutTime: string = "",
    // public prePayment: number = 0,
    // public onSitePayment: number = 0,
    public totalBill: number = 0,
    public paymentMethod: string = "",
    public paymentDetails: string = "",
    public paymentStatus: "Pending" | "Paid" = "Pending",
    public notes: string = "",
    public outletId: string | undefined,
    public feedback: { rating: number; comments: string } = {
      rating: 0,
      comments: "",
    },
    public billingAddress: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
    } = {
      street: "",
      city: "",
      state: "",
      postalCode: "",
    }
  ) {}
}

export class CheckInCheckOutEntity {
  constructor(
    public _id: string | undefined = undefined,
    public reservation: string,
    public client: string,
    public checkIn: string,
    public checkOutTime: string,
    // public prePayment: number,
    // public onSitePayment: number,
    public totalBill: number,
    public paymentMethod: string,
    public paymentDetails: string,
    public paymentStatus: "Pending" | "Paid",
    public notes: string,
    public feedback: { rating: number; comments: string },
    public outletId: string,
    public billingAddress: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
    }
  ) {}
}

export class CheckInCheckOutMapper {
  static toEntity(
    checkOutData: any,
    includeId?: boolean,
    existingCheckOutData?: CheckInCheckOutEntity
  ): CheckInCheckOutEntity {
    if (existingCheckOutData != null) {
      return {
        ...existingCheckOutData,
        reservation:
          checkOutData.reservation !== undefined
            ? checkOutData.reservation
            : existingCheckOutData.reservation,
        client:
          checkOutData.client !== undefined
            ? checkOutData.client
            : existingCheckOutData.client,
        checkIn:
          checkOutData.checkIn !== undefined
            ? checkOutData.checkIn
            : existingCheckOutData.checkIn,
        checkOutTime:
          checkOutData.checkOutTime !== undefined
            ? checkOutData.checkOutTime
            : existingCheckOutData.checkOutTime,
        // prePayment:
        //   checkOutData.prePayment !== undefined
        //     ? checkOutData.prePayment
        //     : existingCheckOutData.prePayment,
        // onSitePayment:
        //   checkOutData.onSitePayment !== undefined
        //     ? checkOutData.onSitePayment
        //     : existingCheckOutData.onSitePayment,
        totalBill:
          checkOutData.totalBill !== undefined
            ? checkOutData.totalBill
            : existingCheckOutData.totalBill,
        paymentMethod:
          checkOutData.paymentMethod !== undefined
            ? checkOutData.paymentMethod
            : existingCheckOutData.paymentMethod,
        paymentDetails:
          checkOutData.paymentDetails !== undefined
            ? checkOutData.paymentDetails
            : existingCheckOutData.paymentDetails,
        paymentStatus:
          checkOutData.paymentStatus !== undefined
            ? checkOutData.paymentStatus
            : existingCheckOutData.paymentStatus,
        notes:
          checkOutData.notes !== undefined
            ? checkOutData.notes
            : existingCheckOutData.notes,
        feedback:
          checkOutData.feedback !== undefined
            ? checkOutData.feedback
            : existingCheckOutData.feedback,
        outletId:
          checkOutData.outletId !== undefined
            ? checkOutData.outletId
            : existingCheckOutData.outletId,
        billingAddress:
          checkOutData.billingAddress !== undefined
            ? checkOutData.billingAddress
            : existingCheckOutData.billingAddress,
      };
    } else {
      const checkOutEntity: CheckInCheckOutEntity = {
        _id: includeId
          ? checkOutData._id
            ? checkOutData._id.toString()
            : undefined
          : checkOutData._id.toString(),
        reservation: checkOutData.reservation,
        client: checkOutData.client,
        checkIn: checkOutData.checkIn,
        checkOutTime: checkOutData.checkOutTime,
        // prePayment: checkOutData.prePayment,
        // onSitePayment: checkOutData.onSitePayment,
        totalBill: checkOutData.totalBill,
        paymentMethod: checkOutData.paymentMethod,
        paymentDetails: checkOutData.paymentDetails,
        paymentStatus: checkOutData.paymentStatus,
        notes: checkOutData.notes,
        feedback: checkOutData.feedback,
        outletId: checkOutData.outletId,
        billingAddress: checkOutData.billingAddress,
      };
      return checkOutEntity;
    }
  }

  static toModel(checkOutData: CheckInCheckOutEntity): CheckInCheckOutModel {
    return {
      reservation: checkOutData.reservation,
      client: checkOutData.client,
      checkIn: checkOutData.checkIn,
      checkOutTime: checkOutData.checkOutTime,
      // prePayment: checkOutData.prePayment,
      // onSitePayment: checkOutData.onSitePayment,
      totalBill: checkOutData.totalBill,
      paymentMethod: checkOutData.paymentMethod,
      paymentDetails: checkOutData.paymentDetails,
      paymentStatus: checkOutData.paymentStatus,
      notes: checkOutData.notes,
      feedback: checkOutData.feedback,
      outletId: checkOutData.outletId,
      billingAddress: checkOutData.billingAddress,
    };
  }
}
