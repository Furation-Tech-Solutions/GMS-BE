// emailTemplates.ts

import { UserEntity } from "@domain/user-account/entities/user-account";

export interface EmailTemplate {
    subject: string;
    message: (user: any) => string;
  }
  
  export const registrationEmailTemplate: EmailTemplate = {
    subject: 'Welcome to Our Platform - Registration Successful',
    message: (user:any) => {
      return `Dear ${user.firstName},
  
  Welcome to our platform! We're excited to have you as a new member of our community. Thank you for choosing to register with us.
  
  Below are your registration details:
  
  Username/Email: ${user.email}
  
  Please keep this email in a safe place and do not share your login credentials with anyone. For security reasons, we recommend changing your password as soon as you log in for the first time.
  
  If you have any questions or need assistance, please don't hesitate to contact our support team at [Support Email Address]. We're here to help.
  
  Thank you for joining us. We look forward to providing you with a great experience on our platform.
  
  Best regards,
  The [Your Platform Name] Team`;
    },
  };
  
  export const loginEmailTemplate: EmailTemplate = {
    subject: 'Login Notification',
    message: (user: UserEntity) => {
      return `Hello ${user.firstName},
  
  You have successfully logged into your account at [Your Platform Name] on [Login Date and Time]. If this login was not authorized by you, please contact us immediately.
  
  If you have any questions or need assistance, please don't hesitate to contact our support team at [Support Email Address].
  
  Thank you for using [Your Platform Name].
  
  Best regards,
  The [Your Platform Name] Team`;
    },
  };
  
  export const bookingRequestConfirmationEmailTemplate: EmailTemplate = {
    subject: 'Booking Request Confirmation',
    message: (user: any) => {
      return `Dear ${user.firstName},

      Your booking request with status has been "completed". Here are the details:
      
      Booking ID: ${user._id}
      Check-in Date: ${user.reservationDate}
      Check-out Time: ${user.reservationTime}
      Number of Guests: ${user.numberOfGuest}
      Duration: ${user.duration}
      
      We look forward to welcoming you on your arrival. If you have any questions or need further assistance, please feel free to contact us at [Contact Email Address].
      
      Thank you for choosing us for your stay.
      
      Best regards,
      The [Your Hotel/Service Name] Team`
    },
  };
  