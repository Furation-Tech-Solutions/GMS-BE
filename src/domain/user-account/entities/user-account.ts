

// Express API request populate the Admin Model
export class UserModel {
    constructor(
        public firstName: string = "",
        public lastName: string = "",
        public email: string = "",
        public jobTitle: string = "",
        public accessLevel:string="Manager",
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
        public isLogin:boolean=false,
        public permissions: [] = [],
        public emailNotification:[] = []
    ) {}
  }
  
  // Admin Entity provided by Admin Repository is converted to Express API Response
  export class UserEntity {
    constructor(
      public id: string | undefined = undefined,
      public firstName: string,
      public lastName: string,
      public email: string ,
      public jobTitle: string ,
      public accessLevel: string,
      public managerSettings: {
        emailAlertsEnabled: boolean;
        multifactorAuthenticationEnabled: boolean;
        suspended: boolean;
        lastLogin: string;
        lastPasswordReset: string;
      },
      public isLogin:boolean,
      public permissions: [],
      public  emailNotification: []
    ) {}
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
           userData.isLogin!==undefined
           ? userData.isLogin
           : existingUser.isLogin,
        permissions:
          userData.permissions !== undefined
            ? userData.permissions
            : existingUser.permissions,
        emailNotification:
         userData.emailNotification !== undefined
          ? userData.emailNotification
          : existingUser.emailNotification
            
      };
    } else {
      const userEntity: UserEntity= {
        id: includeId
          ? userData._id
            ? userData._id.toString()
            : undefined
          : userData._id.toString(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        jobTitle: userData.jobTitle,
        accessLevel: userData.accessLevel,
        managerSettings: {
          emailAlertsEnabled:
            userData.managerSettings?.emailAlertsEnabled || false,
          multifactorAuthenticationEnabled:
            userData.managerSettings?.multifactorAuthenticationEnabled || false,
          suspended: userData.managerSettings?.suspended || false,
          lastLogin: userData.managerSettings?.lastLogin || "",
          lastPasswordReset: userData.managerSettings?.lastPasswordReset || "",
        },
        isLogin:userData.isLogin,
        permissions: userData.permissions || [],
        emailNotification:userData.emailNotification||[]
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
            managerSettings: user.managerSettings,
            isLogin: user.isLogin,  
            permissions: user.permissions,
            emailNotification:user.emailNotification
          };
    }
  }
  

























