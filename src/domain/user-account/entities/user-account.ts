
// Express API request populate the Admin Model
export class UserModel {
  constructor(
    public firstName: string = "",
    public lastName: string = "",
    public email: string = "",
    public jobTitle: string = "",
    public accessLevel: string = "Manager",
    public profileImage:string = "",
    public managerSettings: {
      emailAlertsEnabled: boolean;
      multifactorAuthenticationEnabled: boolean;
      suspended: boolean;
      lastLogin: string;
      lastPasswordReset: string;
    } = {
        emailAlertsEnabled: false,
        multifactorAuthenticationEnabled: false,
        suspended: false,
        lastLogin: "",
        lastPasswordReset: "",
      },
    public isLogin: boolean = false,
    public permissions: [] = [],
    public updatedBy: string | { _id: string } | undefined = undefined,
    public createdBy: string | { _id: string } | undefined = undefined,
    public firebaseDeviceToken: string = ""
  ) { }
}
export class UserLoginModel {
  constructor(public email: string = "",public firebaseToken:string="") {}
}

// Admin Entity provided by Admin Repository is converted to Express API Response
export class UserEntity {
  constructor(
    public _id: string | undefined = undefined,
    public firstName: string,
    public lastName: string,
    public email: string,
    public jobTitle: string,
    public accessLevel: string,
    public profileImage:string,
    public managerSettings: {
      emailAlertsEnabled: boolean;
      multifactorAuthenticationEnabled: boolean;
      suspended: boolean;
      lastLogin: string;
      lastPasswordReset: string;
    },
    public isLogin: boolean,
    public permissions: [],
    public updatedBy: string | { _id: string } | undefined = undefined,
    public createdBy: string | { _id: string } | undefined = undefined,
    public firebaseDeviceToken: string
  ) { }
}

export class UserMapper {
  static toEntity(
    userData: any,
    includeId?: boolean,
    existingUser?: UserEntity | null
  ): UserEntity {
    if (existingUser != null) {
      return {
        ...existingUser,
        firstName:
          userData.firstName !== undefined
            ? userData.firstName
            : existingUser.firstName,
        lastName:
          userData.lastName !== undefined
            ? userData.lastName
            : existingUser.lastName,
        email:
          userData.email !== undefined ? userData.email : existingUser.email,
        jobTitle:
          userData.jobTitle !== undefined
            ? userData.jobTitle
            : existingUser.jobTitle,
        accessLevel:
          userData.accessLevel !== undefined
            ? userData.accessLevel
            : existingUser.accessLevel,
          profileImage:
            userData.profileImage!==undefined
              ? userData.profileImage
              : existingUser.profileImage,
        managerSettings: {
          emailAlertsEnabled:
            userData.managerSettings?.emailAlertsEnabled !== undefined
              ? userData.managerSettings.emailAlertsEnabled
              : existingUser.managerSettings.emailAlertsEnabled,
          multifactorAuthenticationEnabled:
            userData.managerSettings?.multifactorAuthenticationEnabled !==
              undefined
              ? userData.managerSettings.multifactorAuthenticationEnabled
              : existingUser.managerSettings.multifactorAuthenticationEnabled,
          suspended:
            userData.managerSettings?.suspended !== undefined
              ? userData.managerSettings.suspended
              : existingUser.managerSettings.suspended,
          lastLogin:
            userData.managerSettings?.lastLogin !== undefined
              ? userData.managerSettings.lastLogin
              : existingUser.managerSettings.lastLogin,
          lastPasswordReset:
            userData.managerSettings?.lastPasswordReset !== undefined
              ? userData.managerSettings.lastPasswordReset
              : existingUser.managerSettings.lastPasswordReset,
        },
        isLogin:
          userData.isLogin !== undefined
            ? userData.isLogin
            : existingUser.isLogin,
        permissions:
          userData.permissions !== undefined
            ? userData.permissions
            : existingUser.permissions,
        updatedBy:
          userData.updatedBy !== undefined
            ? { _id: userData.updatedBy }
            : existingUser.updatedBy,
        createdBy:
          userData.createdBy !== undefined
            ? { _id: userData.createdBy }
            : existingUser.createdBy,
        firebaseDeviceToken:
          userData.firebaseDeviceToken !== undefined
            ? userData.firebaseDeviceToken
            : existingUser.firebaseDeviceToken,
      };
    } else {
      const userEntity: UserEntity = {
        _id: includeId
          ? userData._id
            ? userData._id.toString()
            : undefined
          : userData._id.toString(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        jobTitle: userData.jobTitle,
        accessLevel: userData.accessLevel,
        profileImage: userData.profileImage,
        managerSettings: {
          emailAlertsEnabled:
            userData.managerSettings?.emailAlertsEnabled || false,
          multifactorAuthenticationEnabled:
            userData.managerSettings?.multifactorAuthenticationEnabled || false,
          suspended: userData.managerSettings?.suspended || false,
          lastLogin: userData.managerSettings?.lastLogin || "",
          lastPasswordReset: userData.managerSettings?.lastPasswordReset || "",
        },
        isLogin: userData.isLogin,
        permissions: userData.permissions || [],
        updatedBy: { _id: userData.updatedBy },
        createdBy: { _id: userData.createdBy },
        firebaseDeviceToken: userData.firebaseDeviceToken || "",
      };
      return userEntity;
    }
  }

  static toModel(user: UserEntity): UserModel {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      jobTitle: user.jobTitle,
      accessLevel: user.accessLevel,
      profileImage:user.profileImage,
      managerSettings: user.managerSettings,
      isLogin: user.isLogin,
      permissions: user.permissions,
      updatedBy: user.updatedBy,
      createdBy: user.createdBy,
      firebaseDeviceToken: user.firebaseDeviceToken,
    };
  }
}
