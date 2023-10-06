// emailTemplates.ts

import { UserEntity } from "@domain/user-account/entities/user-account";

export interface EmailTemplate {
    subject: string;
    message: (user: any) => string | null;
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

  export const reservationStatusEmailTemplate: EmailTemplate = {
    subject: 'Reservation Status Notification',
    message: (reservation: any) => {
      return `Dear ${reservation.client.firstName},
  
    We are pleased to inform you that your reservation with the following details has been successfully created:
  
    Reservation Date: ${reservation.date}
    Number of Guests: ${reservation.noOfGuests}
    Shift: ${reservation.shift.shiftName}
    Duration: ${reservation.duration}
    Seating Area: ${reservation.seatingArea.seatingAreaName}
    Time Slot: ${reservation.timeSlot}
    Table Number: ${reservation.table.tableNo}
    Reservation Note: ${reservation.reservationNote}
    Perks: ${reservation.perks}
  
    Your reservation is confirmed and ready for your visit. If you have any questions or need to make changes to your reservation, please don't hesitate to contact us at [Support Email Address] or [Support Phone Number].
  
    We look forward to serving you and providing a wonderful dining experience.
  
    Best regards,
    The [Your Hotel Name] Team`;
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
      const allowedStatuses = ["Booked", "Declined"];

    if (!allowedStatuses.includes(user.status.name)) {
      return null; // Return null if the status is not allowed
    }

    let statusMessage = '';

    switch (user.status.name) {
      case 'Booked':
        statusMessage = 'Your booking request has been confirmed.';
        break;
      case 'Declined':
        statusMessage = 'Unfortunately, your booking request has been declined.';
        break;
      default:
        statusMessage = 'Your booking request status has been updated.';
    }

    return `Dear ${user.firstName},

${statusMessage}

Here are the details of your booking request:

Reservation Date: ${user.reservationDate}
Reservation Time: ${user.reservationTime}
Number of Guests: ${user.numberOfGuest}
Duration: ${user.duration}
Status: ${user.status.name}

We look forward to serving you. If you have any questions or need further assistance, please feel free to contact us at [Contact Email Address].

Thank you for choosing us for your stay.

Best regards,
The [Your Hotel/Service Name] Team`;
  },
    
  };
  