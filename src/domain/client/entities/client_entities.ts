// Express API request populate the Client Model
export class ClientModel {
  constructor(
    public firstName: string = "",
    public lastName: string = "",
    public salutation: string = "",
    public jobTitle: string = "",
    public company: string = "",
    public profileNotes: string = "",
    public profileImage: string = "",
    public privateNotes: string = "",
    public tags: string[] = [],
    public email: string = "",
    public altEmail: string = "",
    public phone: string = "",
    public workPhone: string = "",
    public address: string = "",
    public city: string = "",
    public state: string = "",
    public country: string = "",
    public pincode: number = 0,
    public contactInfoVisibilityOnlyToSuperUser: boolean,
    public birthDate: string,
    public anniversaryDate: string,
    public visits: number = 0,
    public reservationCencel: number = 0,
    public spends: number = 0,
    public language: string,
    public gender: string,
    public isClient: boolean = false,
    public outletId: string | undefined,
    public updatedBy: string | { _id: string } | undefined,
    public createdBy: string | { _id: string } | undefined, // public createdAt: Date
    public activityLogs: string[] = [] // public createdAt: Date

  ) {}
}

// Client Entity provided by Client Repository is converted to Express API Response
export class ClientEntity {
  constructor(
    public _id: string | undefined = undefined, // Set a default value for id
    public firstName: string = "",
    public lastName: string = "",
    public salutation: string = "",
    public jobTitle: string = "",
    public company: string = "",
    public profileNotes: string = "",
    public profileImage: string = "",
    public privateNotes: string = "",
    public tags: string[] = [],
    public email: string = "",
    public altEmail: string = "",
    public phone: string = "",
    public workPhone: string = "",
    public address: string = "",
    public city: string = "",
    public state: string = "",
    public country: string = "",
    public pincode: number = 0,
    public contactInfoVisibilityOnlyToSuperUser: boolean,
    public birthDate: string,
    public anniversaryDate: string,
    public visits: number,
    public reservationCencel: number,
    public spends: number,
    public language: string,
    public gender: string,
    public isClient: boolean,
    public outletId: string ,
    public updatedBy: string | { _id: string } | undefined,
    public createdBy: string | { _id: string } | undefined,
    public activityLogs: string[],
    public createdAt: Date
  ) {}
}

/* ================================================= */
export class ClientMapper {
  static toEntity(
    clientData: any,
    includeId?: boolean,
    existingClient?: ClientEntity
  ): ClientEntity {
    if (existingClient != null) {
      return {
        ...existingClient,
        firstName:
          clientData.firstName !== undefined
            ? clientData.firstName
            : existingClient.firstName,
        lastName:
          clientData.lastName !== undefined
            ? clientData.lastName
            : existingClient.lastName,
        salutation:
          clientData.salutation !== undefined
            ? clientData.salutation
            : existingClient.salutation,
        jobTitle:
          clientData.jobTitle !== undefined
            ? clientData.jobTitle
            : existingClient.jobTitle,
        company:
          clientData.company !== undefined
            ? clientData.company
            : existingClient.company,
        profileNotes:
          clientData.profileNotes !== undefined
            ? clientData.profileNotes
            : existingClient.profileNotes,
        profileImage:
          clientData.profileImage !== undefined
            ? clientData.profileImage
            : existingClient.profileImage,
        privateNotes:
          clientData.privateNotes !== undefined
            ? clientData.privateNotes
            : existingClient.privateNotes,
        tags:
          clientData.tags !== undefined ? clientData.tags : existingClient.tags,
        email:
          clientData.email !== undefined
            ? clientData.email
            : existingClient.email,
        altEmail:
          clientData.altEmail !== undefined
            ? clientData.altEmail
            : existingClient.altEmail,
        phone:
          clientData.phone !== undefined
            ? clientData.phone
            : existingClient.phone,
        workPhone:
          clientData.workPhone !== undefined
            ? clientData.workPhone
            : existingClient.workPhone,
        address:
          clientData.address !== undefined
            ? clientData.address
            : existingClient.address,
        city:
          clientData.city !== undefined ? clientData.city : existingClient.city,
        state:
          clientData.state !== undefined
            ? clientData.state
            : existingClient.state,
        country:
          clientData.country !== undefined
            ? clientData.country
            : existingClient.country,
        pincode:
          clientData.pincode !== undefined
            ? clientData.pincode
            : existingClient.pincode,
        contactInfoVisibilityOnlyToSuperUser:
          clientData.contactInfoVisibilityOnlyToSuperUser !== undefined
            ? clientData.contactInfoVisibilityOnlyToSuperUser
            : existingClient.contactInfoVisibilityOnlyToSuperUser,
        birthDate:
          clientData.birthDate !== undefined
            ? clientData.birthDate
            : existingClient.birthDate,
        anniversaryDate:
          clientData.anniversaryDate !== undefined
            ? clientData.anniversaryDate
            : existingClient.anniversaryDate,
        visits:
          clientData.visits !== undefined
            ? clientData.visits
            : existingClient.visits,
        reservationCencel:
          clientData.reservationCencel !== undefined
            ? clientData.reservationCencel
            : existingClient.reservationCencel,
        spends:
          clientData.spends !== undefined
            ? clientData.spends
            : existingClient.spends,
        language:
          clientData.language !== undefined
            ? clientData.language
            : existingClient.language,
        gender:
          clientData.gender !== undefined
            ? clientData.gender
            : existingClient.gender,
        isClient:
          clientData.isClient !== undefined
            ? clientData.isClient
            : existingClient.isClient,
        outletId:
          clientData.outletId !== undefined
            ? clientData.outletId
            : existingClient.outletId,
        updatedBy:
          clientData.updatedBy !== undefined
            ? { _id: clientData.updatedBy }
            : existingClient.updatedBy,
        createdBy:
          clientData.createdBy !== undefined
            ? { _id: clientData.createdBy }
            : existingClient.createdBy,
            activityLogs:
          clientData.activityLogs !== undefined
              ? clientData.activityLogs
              : existingClient.activityLogs,
        createdAt:
          clientData.createdAt !== undefined
            ? clientData.createdAt
            : existingClient.createdAt,
      };
    } else {
      const clientEntity: ClientEntity = {
        _id: includeId
          ? clientData._id
            ? clientData._id.toString()
            : undefined
          : clientData._id.toString(),
        firstName: clientData.firstName,
        lastName: clientData.lastName,
        salutation: clientData.salutation,
        jobTitle: clientData.jobTitle,
        company: clientData.company,
        profileNotes: clientData.profileNotes,
        profileImage: clientData.profileImage,
        privateNotes: clientData.privateNotes,
        tags: clientData.tags,
        email: clientData.email,
        altEmail: clientData.altEmail,
        phone: clientData.phone,
        workPhone: clientData.workPhone,
        address: clientData.address,
        city: clientData.city,
        state: clientData.state,
        country: clientData.country,
        pincode: clientData.pincode,
        contactInfoVisibilityOnlyToSuperUser:
          clientData.contactInfoVisibilityOnlyToSuperUser,
        birthDate: clientData.birthDate,
        anniversaryDate: clientData.anniversaryDate,
        visits: clientData.visits,
        reservationCencel: clientData.reservationCencel,
        spends: clientData.spends,
        language: clientData.language,
        gender: clientData.gender,
        isClient: clientData.isClient,
        outletId: clientData.outletId,
        updatedBy: { _id: clientData.updatedBy },
        createdBy: { _id: clientData.createdBy },
        activityLogs: clientData.activityLogs,
        createdAt: clientData.createdAt,
      };
      return clientEntity;
    }
  }

  static toModel(client: ClientEntity): any {
    return {
      firstName: client.firstName,
      lastName: client.lastName,
      salutation: client.salutation,
      jobTitle: client.jobTitle,
      company: client.company,
      profileNotes: client.profileNotes,
      profileImage: client.profileImage,
      privateNotes: client.privateNotes,
      tags: client.tags,
      email: client.email,
      altEmail: client.altEmail,
      phone: client.phone,
      workPhone: client.workPhone,
      address: client.address,
      city: client.city,
      state: client.state,
      country: client.country,
      pincode: client.pincode,
      contactInfoVisibilityOnlyToSuperUser:
        client.contactInfoVisibilityOnlyToSuperUser,
      birthDate: client.birthDate,
      anniversaryDate: client.anniversaryDate,
      visits: client.visits,
      reservationCencel: client.reservationCencel,
      spends: client.spends,
      language: client.language,
      gender: client.gender,
      isClient: client.isClient,
      outletId: client.outletId,
      updatedBy: client.updatedBy,
      activityLogs: client.activityLogs,
      createdBy: client.createdBy,
      createdAt: client.createdAt,
    };
  }
}
