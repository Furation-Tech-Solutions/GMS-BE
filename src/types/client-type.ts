

export type ClientEntityWithKey = {
    [key: string]: any;
    _id: string | undefined, // Set a default value for id
    firstName: string ,
    lastName: string ,
    salutation: string ,
    jobTitle: string ,
    company: string ,
    profileNotes: string ,
    profileImage: string ,
    privateNotes: string ,
    tags: string[] ,
    email: string ,
    altEmail: string ,
    phone: string ,
    workPhone: string ,
    address: string ,
    city: string ,
    state: string ,
    country: string ,
    pincode: number,
    contactInfoVisibilityOnlyToSuperUser: boolean,
    birthDate: string,
    anniversaryDate: string,
    visits: number,
    reservationCencel: number,
    spends: number,
    language: string,
    gender: string,
    isClient: boolean,
    outletId: string | { _id: string },
    updatedBy: string | { _id: string } | undefined,
    createdBy: string | { _id: string } | undefined,
    activityLogs: string[],
    createdAt: Date
  };
  