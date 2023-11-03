import { Request, Response } from 'express'; // Import necessary modules and types
// import { Either, ErrorClass, AddReservationEntity } from './types'; // Import your types here
// import { createWhatsAppMessage } from './whatsappTemplates'; // Import your WhatsApp template function
// import { generateEmailContent } from './emailTemplates'; // Import your email template function
import { GetAddReservationById } from '@domain/add-reservation/usecases/get-add-reservation-by-id';
import { AddReservationDataSourceImpl } from '@data/add-reservation/datasources/add-reservation-data-source';
import mongoose from 'mongoose';
import { bookingRequestTemplate, cancelReservationTemplate, leftReservationTemplate, confirmReservationTemplate, reminderEmailTemplate, userAccountTemplate } from '@presentation/services/email-templates';
import EmailService from '@presentation/services/send-mail';
import { createWhatsAppMessage } from '@presentation/services/whatsapp-template';
import WhatsAppService from '@presentation/services/whatsapp-services';
import { UserAccount } from '@data/user-account/models/user-account-model';
import { OutletDataSourceImpl } from '@data/outlet/datasources/outlet-data-source';


const whatsappRecipient = '919881239491'; // Replace with the recipient's phone number
const getAddReservationByIdUsecase = new AddReservationDataSourceImpl(mongoose.connection)
const outletDataSourceImpl = new OutletDataSourceImpl(mongoose.connection)
const emailService = new EmailService()
const whatsAppService = new WhatsAppService()


const managerArr = ["amul.shinde@furation.tech", "shahzad.shaikh@furation.tech", "shehzadmalik123.sm@gmail.com"]

function formatDate(inputDate: string): string {
  const date = new Date(inputDate);
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const weekday = daysOfWeek[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${weekday}, ${day} ${month} ${year}`;
}
function formatTime(inputTime: string): string {
  const timeParts = inputTime.split(":");
  const hours = parseInt(timeParts[0], 10);
  const minutes = timeParts[1];
  const period = hours >= 12 ? "PM" : "AM";

  // Convert 24-hour format to 12-hour format
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

  return `${formattedHours}:${minutes} ${period}`;
}
class EmailHandler {



  async handleReservation(id: string): Promise<void> {
    try {
      // Your reservation creation logic here..
      const addReservation = await getAddReservationByIdUsecase.read(id);

      const outlet = await outletDataSourceImpl.getById(addReservation.outletId._id)


      if (addReservation.reservationStatus === "unassigned" || addReservation.reservationStatus === "UNASSIGNED") {
        console.log('unassigned 1')
        const date = formatDate(addReservation.date)
        const startTime = formatTime(addReservation.timeSlot);
        const emailContent = await bookingRequestTemplate(addReservation, date, startTime);

        const emailOption = {
          // email:,
          email: addReservation.client.email,
          subject: "Booking Request Confirmation",
          message: emailContent,
        };

        const whatsappMessage = {
          "name": "booking_request",
          "language": {
            "code": "en"
          },
          "components": [
            {
              "type": "body",
              "parameters": [
                {
                  "type": "text",
                  "text": `${outlet.outletName}`
                },
                {
                  "type": "text",
                  "text": `${addReservation.client.firstName}`
                },
                {
                  "type": "date_time",
                  "date_time": {
                    "fallback_value": `${date}`
                  }
                },
                {
                  "type": "text",
                  "text": `${addReservation.noOfGuests}`
                },
                {
                  "type": "text",
                  "text": `${startTime}`
                }
                , {
                  "type": "text",
                  "text": `${outlet.address}`
                }
                , {
                  "type": "text",
                  "text": `+91 ${outlet.phone}`
                }
              ]
            }
          ]
        }

        try {

          await emailService.sendEmail(emailOption);
          await whatsAppService.sendWhatsAppMessage(addReservation.client.phone, whatsappMessage);

        } catch (error: any) {
          console.log('WhatsApp Error:', error.message);
        }
      }
      else if (addReservation.reservationStatus === "confirmed" || addReservation.reservationStatus === "CONFIRMED") {
        console.log('confirmed 2')
        const date = await formatDate(addReservation.date)

        const startTime = await formatTime(addReservation.timeSlot);

        const emailContent = await confirmReservationTemplate(addReservation, date, startTime);
        const emailOption = {
          // email:addReservation.client.email,
          email: addReservation.client.email,
          subject: "Reservation Confirmation",
          message: emailContent,
        };
        
        const whatsappMessage = {
          "name": "confirm_reservation",
          "language": {
            "code": "en_US"
          },
          "components": [
            {
              "type": "body",
              "parameters": [
                {
                  "type": "text",
                  "text": `${outlet.outletName}`
                },
                {
                  "type": "text",
                  "text": `${addReservation.client.firstName}`
                },
                {
                  "type": "date_time",
                  "date_time": {
                    "fallback_value": `${date}`
                  }
                },
                {
                  "type": "text",
                  "text": `${addReservation.noOfGuests}`
                },
                {
                  "type": "text",
                  "text": `${startTime}`
                },
                {
                  "type": "text",
                  "text": `${addReservation.seatingArea.seatingAreaName}`
                },
                {
                  "type": "text",
                  "text": `${outlet.address}`
                },
                {
                  "type": "text",
                  "text": `+91 ${outlet.phone}`
                },
              ]
            }
          ]
        }

        try {
          await emailService.sendEmail(emailOption);
          await whatsAppService.sendWhatsAppMessage(addReservation.client.phone, whatsappMessage);

        } catch (error: any) {
          console.log('WhatsApp Error:', error.message);
        }

      }
      else if (addReservation.reservationStatus === "cancel" || addReservation.reservationStatus === "cancelled and notify" || addReservation.reservationStatus === "CANCELLED AND NOTIFY" || addReservation.reservationStatus === "CANCEL") {
        console.log('cancelled and notify 3')

        const date = await formatDate(addReservation.date)
        // const date="12121"
        const startTime = await formatTime(addReservation.timeSlot);
        const emailContent = await cancelReservationTemplate(addReservation, date, startTime);
        const emailOption = {
          // email:addReservation.client.email,
          email: addReservation.client.email,
          subject: "Reservation cancellation",
          message: emailContent,
        };
        
        const whatsappMessage = {
          "name": "cancel_reservation",
          "language": {
            "code": "en_US"
          },
          "components": [
            {
              "type": "body",
              "parameters": [
                {
                  "type": "text",
                  "text": `${outlet.outletName}`
                },
                {
                  "type": "text",
                  "text": `${addReservation.client.firstName}`
                },
                {
                  "type": "date_time",
                  "date_time": {
                    "fallback_value": `${date}`
                  }
                },
                {
                  "type": "text",
                  "text": `${addReservation.noOfGuests}`
                },
                {
                  "type": "text",
                  "text": `${startTime}`
                },
                {
                  "type": "text",
                  "text": `${outlet.address}`
                },
                {
                  "type": "text",
                  "text": `+91 ${outlet.phone}`
                },
              ]
            }
          ]
        }

        try {
          await emailService.sendEmail(emailOption);
          await whatsAppService.sendWhatsAppMessage(addReservation.client.phone, whatsappMessage);

        } catch (error:any) {
          console.log('WhatsApp Error:', error.message);
        }
      }
      else if (addReservation.reservationStatus === "left" || addReservation.reservationStatus === 'LEFT' || addReservation.reservationStatus === "Left") {
        console.log("left 4")

        const date = formatDate(addReservation.date)
        const startTime = formatTime(addReservation.timeSlot);
        const emailContent = await leftReservationTemplate(addReservation, date, startTime);
        const emailOption = {
          // email:addReservation.client.email,
          email: addReservation.client.email,
          subject: "Thank You for Dining with Us ",
          message: emailContent,
        };
      
        const whatsappMessage = {
          "name": "post_dinning",
          "language": {
            "code": "en_US"
          },
          "components": [
            {
              "type": "body",
              "parameters": [
                {
                  "type": "text",
                  "text": `${outlet.outletName}`
                },
                {
                  "type": "text",
                  "text": `${addReservation.client.firstName}`
                },
                {
                  "type": "date_time",
                  "date_time": {
                    "fallback_value": `${date}`
                  }
                },
                {
                  "type": "text",
                  "text": `${addReservation.noOfGuests}`
                },
                {
                  "type": "text",
                  "text": `${startTime}`
                },
                {
                  "type": "text",
                  "text": `${addReservation.seatingArea.seatingAreaName}`
                },
                {
                  "type": "text",
                  "text": `${addReservation.serverName}`
                }, {
                  "type": "text",
                  "text": `+91 ${outlet.phone}`
                }, {
                  "type": "text",
                  "text": `${outlet.address}`
                }
              ]
            }
          ]
        }

        try {
          await emailService.sendEmail(emailOption);

          await whatsAppService.sendWhatsAppMessage(addReservation.client.phone, whatsappMessage);
        } catch (error: any) {
          console.log('WhatsApp Error:', error.message);
        }
      }


    }

    catch (error: any) {
      console.log({"error": error.message});
    }
  }
  async reminderEmail(user: any): Promise<void> {
    try {
      const addReservation = await getAddReservationByIdUsecase.read(user);
      const outlet = await outletDataSourceImpl.getById(addReservation.outletId._id)

      const date = await formatDate(addReservation.date)
      // const date="12121"
      const startTime = await formatTime(addReservation.timeSlot);
      const emailContent = await reminderEmailTemplate(addReservation, date, startTime);
      const emailOption = {
        // email:addReservation.client.email,
        email: addReservation.client.email,
        subject: "Reservation Reminder",
        message: emailContent,
      };
  
      const whatsappMessage = {
        "name": "reservation_reminder",
        "language": {
          "code": "en_US"
        },
        "components": [
          {
            "type": "body",
            "parameters": [
              {
                "type": "text",
                "text": `${outlet.outletName}`
              },
              {
                "type": "text",
                "text": `${addReservation.client.firstName}`
              },
              {
                "type": "date_time",
                "date_time": {
                  "fallback_value": `${date}`
                }
              },
              {
                "type": "text",
                "text": `${addReservation.noOfGuests}`
              },
              {
                "type": "text",
                "text": `${startTime}`
              },
              {
                "type": "text",
                "text": `${addReservation.seatingArea.seatingAreaName}`
              },
              {
                "type": "text",
                "text": `${outlet.address}`
              },
              {
                "type": "text",
                "text": `+91 ${outlet.phone}`
              }
            ]
          }
        ]
      }

      try {
        await emailService.sendEmail(emailOption);
        await whatsAppService.sendWhatsAppMessage(addReservation.client.phone, whatsappMessage);
      } catch (error: any) {
        console.log('WhatsApp Error:', error.message);
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  async userEmailHandler(user: any): Promise<void> {
    try {
      const emailContent = await userAccountTemplate(user);
      const emailOption = {
        email: user.email,
        subject: "User Registration",
        message: emailContent,
      };
      await emailService.sendEmail(emailOption);
    }
    catch (err) {
      console.log(err)
    }
    //   }
  }
}
export default EmailHandler