// Express API request populate the BookingRequest Model
export class BookingRequestModel {
  constructor(
    public firstName: string = "",
    public lastName: string = "",
    public email: string = "",
    public phone: string = "",
    public specialInstructions: string = "",
    public reservationDate: string = "",
    public reservationTime: string = "",
    public numberOfGuest: number = 0,
    public duration: string = "",
    public status: string = "",
    public createdAt: Date
  ) { }
}

// BookingRequest Entity provided by BookingRequest Repository is converted to Express API Response
export class BookingRequestEntity {
  constructor(
    public _id: string | undefined = undefined, // Set a default value for id
    public firstName: string = "",
    public lastName: string = "",
    public email: string = "",
    public phone: string = "",
    public specialInstructions: string = "",
    public reservationDate: string = "",
    public reservationTime: string = "",
    public numberOfGuest: number = 0,
    public duration: string = "",
    public status: string = "",
    public createdAt: Date
  ) { }
}

/* ================================================= */
export class BookingRequestMapper {
  static toEntity(
    bookingreqData: any,
    includeId?: boolean,
    existingbookingreq?: BookingRequestEntity
  ): BookingRequestEntity {
    if (existingbookingreq != null) {
      return {
        ...existingbookingreq,
        firstName: bookingreqData.firstName !== undefined ? bookingreqData.name : existingbookingreq.firstName,
        lastName: bookingreqData.firstName !== undefined ? bookingreqData.name : existingbookingreq.firstName,
        email: bookingreqData.email !== undefined ? bookingreqData.email : existingbookingreq.email,
        phone: bookingreqData.phone !== undefined ? bookingreqData.phone : existingbookingreq.phone,
        specialInstructions: bookingreqData.specialInstructions !== undefined ? bookingreqData.specialInstructions : existingbookingreq.specialInstructions,
        reservationDate: bookingreqData.reservationDate !== undefined ? bookingreqData.reservationDate : existingbookingreq.reservationDate,
        reservationTime: bookingreqData.reservationTime !== undefined ? bookingreqData.reservationTime : existingbookingreq.reservationTime,
        numberOfGuest: bookingreqData.numberOfGuest !== undefined ? bookingreqData.numberOfGuest : existingbookingreq.numberOfGuest,
        duration: bookingreqData.duration !== undefined ? bookingreqData.duration : existingbookingreq.duration,
        status: bookingreqData.status !== undefined ? bookingreqData.status : existingbookingreq.status,
        createdAt: bookingreqData.createdAt !== undefined ? bookingreqData.createdAt : existingbookingreq.createdAt,
      };
    } else {
      const bookingRequestEntity: BookingRequestEntity = {
        _id: includeId ? (bookingreqData._id ? bookingreqData._id.toString() : undefined) : bookingreqData._id.toString(),
        firstName: bookingreqData.firstName || null,
        lastName: bookingreqData.lastName || null,
        email: bookingreqData.email || null,
        phone: bookingreqData.phone || null,
        specialInstructions: bookingreqData.specialInstructions || null,
        reservationDate: bookingreqData.reservationDate || null,
        reservationTime: bookingreqData.reservationTime || null,
        numberOfGuest: bookingreqData.numberOfGuest || null,
        duration: bookingreqData.duration || null,
        status: bookingreqData.status || null,
        createdAt: bookingreqData.createdAt || null,
      };
      return bookingRequestEntity;
    }
  }

  static toModel(bookingreqData: BookingRequestEntity): any {
    return {
      firstName: bookingreqData.firstName,
      lastName: bookingreqData.lastName,
      email: bookingreqData.email,
      phone: bookingreqData.phone,
      specialInstructions: bookingreqData.specialInstructions,
      reservationDate: bookingreqData.reservationDate,
      reservationTime: bookingreqData.reservationTime,
      numberOfGuest: bookingreqData.numberOfGuest,
      duration: bookingreqData.duration,
      status: bookingreqData.status,
      createdAt: bookingreqData.createdAt,
    };
  }
}