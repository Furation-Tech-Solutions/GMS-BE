
import { GetAddReservationById } from "@domain/add-reservation/usecases/get-add-reservation-by-id";
import { AddReservationDataSourceImpl } from "@data/add-reservation/datasources/add-reservation-data-source";
import mongoose from "mongoose";
import {
  bookingRequestTemplate,
  cancelReservationTemplate,
  leftReservationTemplate,
  confirmReservationTemplate,
  reminderEmailTemplate,
  userAccountTemplate,
} from "@presentation/services/email-templates";
import EmailService from "@presentation/services/send-mail";
import { createWhatsAppMessage } from "@presentation/services/whatsapp-template";
import WhatsAppService from "@presentation/services/whatsapp-services";
import { UserAccount } from "@data/user-account/models/user-account-model";
import { OutletDataSourceImpl } from "@data/outlet/datasources/outlet-data-source";
import { UserDataSourceImpl } from "@data/user-account/datasources/user-account-data-source";
import {
  SESClient,
  SendEmailCommand,
  SendEmailCommandOutput,
} from "@aws-sdk/client-ses";


const getAddReservationByIdUsecase = new AddReservationDataSourceImpl(
  mongoose.connection
);
const outletDataSourceImpl = new OutletDataSourceImpl(mongoose.connection);
const getUserByIdUsecase = new UserDataSourceImpl(mongoose.connection);
const emailService = new EmailService();
const whatsAppService = new WhatsAppService();



function formatDate(inputDate: string): string {
  const date = new Date(inputDate);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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
function endTimeFormat(inputTime: string, duration: string): string {
  const [timePart, period] = inputTime.split(" ");
  const [hoursStr, minutesStr] = timePart.split(":");
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  const [durationHoursStr, durationMinutesStr] = duration.split(":");
  const durationHours = parseInt(durationHoursStr, 10);
  const durationMinutes = parseInt(durationMinutesStr, 10);

  let totalHours = hours + durationHours;
  let totalMinutes = minutes + durationMinutes;

  // Adjust minutes and hours if they exceed their limits
  if (totalMinutes >= 60) {
    totalMinutes %= 60;
    totalHours++;
  }

  // Ensure hours stay within 12-hour format
  totalHours %= 12;
  if (totalHours === 0) {
    totalHours = 12;
  }

  // Calculate the new period (AM/PM)
  const newPeriod =
    (period === "AM" && totalHours < 12) || (period === "PM" && totalHours < 11)
      ? period
      : period === "AM"
      ? "PM"
      : "AM";

  // Format the time components to ensure they have leading zeros if needed
  const formattedHours = totalHours.toString().padStart(2, "0");
  const formattedMinutes = totalMinutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes} ${newPeriod}`;
}

interface CombinedResponses {
  emailResponse?: SendEmailCommandOutput;
  whatsappResponse?: any;
  error?: any; // Adjust this to a more specific error type if needed;
}
class EmailHandler {
  private async sendEmailAndWhatsApp(
    emailOption: any,
    whatsappMessage: any,
    addReservation: any,
    outlet: any
  ): Promise<CombinedResponses> {
    try {
      const emailResponse = await emailService.sendEmail(emailOption);
      // console.log("EmailResponse:-", emailResponse);

      const whatsappResponse = await whatsAppService.sendWhatsAppMessage(
        addReservation.client.phone,
        whatsappMessage
      );

      return { emailResponse, whatsappResponse };
    } catch (error: any) {
      throw error.message;
    }
  }

  async handleReservation(id: string): Promise<CombinedResponses> {
    try {
      // Your reservation creation logic here..
      const addReservation = await getAddReservationByIdUsecase.read(id);

      const outlet = await outletDataSourceImpl.getById(
        addReservation.outletId._id
      );
      const outletName = outlet.outletName.toLowerCase().split(" ").join("-");

      let emailContent = "";
      let emailOption: any;
      let whatsappMessage: any;

      if (
        addReservation.reservationStatus === "unassigned" ||
        addReservation.reservationStatus === "UNASSIGNED"
      ) {
        const date = formatDate(addReservation.date);
        const startTime = formatTime(addReservation.timeSlot);
        const endTime = endTimeFormat(startTime, addReservation.duration);
        //emailContent = await bookingRequestTemplate(addReservation, date, startTime,outlet);
        let salutation = addReservation.client.salutation ?? 'Mr.';
        emailContent = await confirmReservationTemplate(
          addReservation,
          date,
          startTime,
          endTime,
          outlet
        );
        // console.log(emailContent,"emailContent")
        emailOption = {
          from: outlet.email,
          email: addReservation.client.email,
          subject: "Reservation Confirmation",
          message: emailContent,
        };

        
        const fullName =
          addReservation.client.firstName +
          " " +
          addReservation.client.lastName;

        whatsappMessage = {
          name: "confirmed_reservation_v3",
          language: {
            code: "en_US",
          },
          components: [
            {
              type: "header",
              parameters: [
                {
                  type: "location",
                  location: {
                    latitude: 37.85473,
                    longitude: 45.825798,
                    name: `${outlet.outletName}`,
                    address: `${outlet.city}`,
                  },
                },
              ],
            },
            {
              type: "body",
              parameters: [
                {
                  type: "text",
                  text: `${salutation}`,
                },
                {
                  type: "text",
                  text: `${fullName}`,
                },
                // {
                //   type: "text",
                //   text: `${addReservation.shift.shiftName}`,
                // },
                {
                  type: "date_time",
                  date_time: {
                    fallback_value: `${date}`,
                  },
                },
                {
                  type: "text",
                  text: `${addReservation.noOfGuests}`,
                },
                {
                  type: "text",
                  text: `${startTime}`,
                },
                // {
                //   type: "text",
                //   text: `${endTime}`,
                // },
                {
                  type: "text",
                  text: `${outlet.outletName}`,
                },
                {
                  type: "text",
                  text: `${outlet.outletName}`,
                },
                {
                  type: "text",
                  text: `${outlet.phone}`,
                },

                {
                  type: "text",
                  text: `${outlet.location}`,
                },
                {
                  type: "text",
                  text: `${outlet.phone}`,
                },
              ],
            },
          ],
        };

        //  whatsappMessage = {
        //   "name": "booking_request",
        //   "language": {
        //     "code": "en"
        //   },
        //   "components": [
        //     {
        //       "type": "body",
        //       "parameters": [
        //         {
        //           "type": "text",
        //           "text": `${outlet.outletName}`
        //         },
        //         {
        //           "type": "text",
        //           "text": `${addReservation.client.firstName}`
        //         },
        //         {
        //           "type": "date_time",
        //           "date_time": {
        //             "fallback_value": `${date}`
        //           }
        //         },
        //         {
        //           "type": "text",
        //           "text": `${addReservation.noOfGuests}`
        //         },
        //         {
        //           "type": "text",
        //           "text": `${startTime}`
        //         }
        //         , {
        //           "type": "text",
        //           "text": `${outlet.address}`
        //         }
        //         , {
        //           "type": "text",
        //           "text": `+91 ${outlet.phone}`
        //         }
        //       ]
        //     }
        //   ]
        // }

        //         try {

        //          const emailResponse= await emailService.sendEmail(emailOption);
        //          console.log("EmailResponse:-",emailResponse)
        //           const whatsappResponse=await whatsAppService.sendWhatsAppMessage(addReservation.client.phone, whatsappMessage);
        //           console.log("whatsappResponse:-",whatsappResponse)
        // return {emailResponse,whatsappResponse}

        //         } catch (error: any) {
        //           throw error.message
        //           // console.log('WhatsApp Error:', error.message);
        //         }
      } else if (
        addReservation.reservationStatus === "confirmed" ||
        addReservation.reservationStatus === "CONFIRMED"
      ) {
        let salutation = addReservation.client.salutation ?? 'Mr.';
        const date = formatDate(addReservation.date);

        const startTime = formatTime(addReservation.timeSlot);
        const endTime = endTimeFormat(startTime, addReservation.duration);

        emailContent = await confirmReservationTemplate(
          addReservation,
          date,
          startTime,
          endTime,
          outlet
        );
        const fullName =
          addReservation.client.firstName +
          " " +
          addReservation.client.lastName;

        emailOption = {
          from: outlet.email,
          // email:addReservation.client.email,
          email: addReservation.client.email,
          subject: "Reservation Confirmation",
          message: emailContent,
        };

        whatsappMessage = {
          name: "confirmed_reservation_v3",
          language: {
            code: "en_US",
          },
          components: [
            {
              type: "header",
              parameters: [
                {
                  type: "location",
                  location: {
                    latitude: 37.85473,
                    longitude: 45.825798,
                    name: `${outlet.outletName}`,
                    address: `${outlet.city}`,
                  },
                },
              ],
            },
            {
              type: "body",
              parameters: [
                {
                  type: "text",
                  text: `${salutation}`,
                },
                {
                  type: "text",
                  text: `${fullName}`,
                },
                // {
                //   type: "text",
                //   text: `${addReservation.shift.shiftName}`,
                // },
                {
                  type: "date_time",
                  date_time: {
                    fallback_value: `${date}`,
                  },
                },
                {
                  type: "text",
                  text: `${addReservation.noOfGuests}`,
                },
                {
                  type: "text",
                  text: `${startTime}`,
                },
                // {
                //   type: "text",
                //   text: `${endTime}`,
                // },
                {
                  type: "text",
                  text: `${outlet.outletName}`,
                },
                  {
                  "type": "text",
                  "text":`${outlet.outletName}`
                },
                 {
                  "type": "text",
                  "text": `${outlet.phone}`
                },

                {
                  type: "text",
                  text: `${outlet.location}`,
                },
                {
                  type: "text",
                  text: `${outlet.phone}`,
                },
              ],
            },
          ],
        };

        // try {
        //   await emailService.sendEmail(emailOption);
        //   await whatsAppService.sendWhatsAppMessage(addReservation.client.phone, whatsappMessage);

        // } catch (error: any) {
        //   throw error.message

        //   // console.log('WhatsApp Error:', error.message);
        // }
      } else if (
        addReservation.reservationStatus === "cancel" ||
        addReservation.reservationStatus === "cancelled and notify" ||
        addReservation.reservationStatus === "CANCELLED AND NOTIFY" ||
        addReservation.reservationStatus === "CANCEL"
      ) {
        const date = await formatDate(addReservation.date);
        // const date="12121"
        const startTime = await formatTime(addReservation.timeSlot);
        emailContent = await cancelReservationTemplate(
          addReservation,
          date,
          startTime,
          outlet
        );
        emailOption = {
          from: outlet.email,
          // email:addReservation.client.email,
          email: addReservation.client.email,
          subject: "Reservation cancellation",
          message: emailContent,
        };

        whatsappMessage = {
          name: "cancel_reservation",
          language: {
            code: "en_US",
          },
          components: [
            {
              type: "body",
              parameters: [
                {
                  type: "text",
                  text: `${outlet.outletName}`,
                },
                {
                  type: "text",
                  text: `${addReservation.client.firstName}`,
                },
                {
                  type: "date_time",
                  date_time: {
                    fallback_value: `${date}`,
                  },
                },
                {
                  type: "text",
                  text: `${addReservation.noOfGuests}`,
                },
                {
                  type: "text",
                  text: `${startTime}`,
                },
                {
                  type: "text",
                  text: `${outlet.address}`,
                },
                {
                  type: "text",
                  text: `+91 ${outlet.phone}`,
                },
              ],
            },
          ],
        };

        // try {
        //   await emailService.sendEmail(emailOption);
        //   await whatsAppService.sendWhatsAppMessage(addReservation.client.phone, whatsappMessage);

        // } catch (error:any) {
        //   throw error.message

        //   // console.log('WhatsApp Error:', error.message);
        // }
      } else if (
        addReservation.reservationStatus === "left" ||
        addReservation.reservationStatus === "LEFT" ||
        addReservation.reservationStatus === "Left"
      ) {

        const date = formatDate(addReservation.date);
        const startTime = formatTime(addReservation.timeSlot);
        emailContent = await leftReservationTemplate(
          addReservation,
          date,
          startTime,
          outlet
        );
        emailOption = {
          from: outlet.email,
          // email:addReservation.client.email,
          email: addReservation.client.email,
          subject: "Thank You for Dining with Us ",
          message: emailContent,
        };

        whatsappMessage = {
          name: "post_dinning",
          language: {
            code: "en_US",
          },
          components: [
            {
              type: "body",
              parameters: [
                {
                  type: "text",
                  text: `${outlet.outletName}`,
                },
                {
                  type: "text",
                  text: `${addReservation.client.firstName}`,
                },
                {
                  type: "date_time",
                  date_time: {
                    fallback_value: `${date}`,
                  },
                },
                {
                  type: "text",
                  text: `${addReservation.noOfGuests}`,
                },
                {
                  type: "text",
                  text: `${startTime}`,
                },
                {
                  type: "text",
                  text: `${addReservation.seatingArea.seatingAreaName}`,
                },
                {
                  type: "text",
                  text: `+91 ${outlet.phone}`,
                },
                {
                  type: "text",
                  text: `${outlet.address}`,
                },
              ],
            },
          ],
        };

        // try {
        //   await emailService.sendEmail(emailOption);

        //   await whatsAppService.sendWhatsAppMessage(addReservation.client.phone, whatsappMessage);
        // } catch (error: any) {
        //   throw error.message

        //   // console.log('WhatsApp Error:', error.message);
        // }
      }
      return this.sendEmailAndWhatsApp(
        emailOption,
        whatsappMessage,
        addReservation,
        outlet
      );
    } catch (error: any) {
      throw error.message;
      // console.log({"error": error.message});
    }
  }
  async reminderEmail(user: any): Promise<CombinedResponses> {
    try {
      const addReservation = await getAddReservationByIdUsecase.read(user);
      const outlet = await outletDataSourceImpl.getById(
        addReservation.outletId._id
      );
      const outletName = outlet.outletName.toLowerCase().split(" ").join("-");

      const senderEmail = outlet.outletName.toLowerCase.split(" ").join("");

      const date = await formatDate(addReservation.date);
      // const date="12121"
      const startTime = await formatTime(addReservation.timeSlot);
      const emailContent = await reminderEmailTemplate(
        addReservation,
        date,
        startTime,
        outlet
      );
      const emailOption = {
        from: outlet.email,
        // email:addReservation.client.email,
        email: addReservation.client.email,
        subject: "Reservation Reminder",
        message: emailContent,
      };

      const whatsappMessage = {
        name: "reservation_reminder",
        language: {
          code: "en_US",
        },
        components: [
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: `${outlet.outletName}`,
              },
              {
                type: "text",
                text: `${addReservation.client.firstName}`,
              },
              {
                type: "date_time",
                date_time: {
                  fallback_value: `${date}`,
                },
              },
              {
                type: "text",
                text: `${addReservation.noOfGuests}`,
              },
              {
                type: "text",
                text: `${startTime}`,
              },
              {
                type: "text",
                text: `${addReservation.seatingArea.seatingAreaName}`,
              },
              {
                type: "text",
                text: `${outlet.address}`,
              },
              {
                type: "text",
                text: `+91 ${outlet.phone}`,
              },
            ],
          },
        ],
      };
      return this.sendEmailAndWhatsApp(
        emailOption,
        whatsappMessage,
        addReservation,
        outlet
      );

      // try {
      //   await emailService.sendEmail(emailOption);
      //   await whatsAppService.sendWhatsAppMessage(addReservation.client.phone, whatsappMessage);
      // } catch (error: any) {
      //   throw error.message

      //   // console.log('WhatsApp Error:', error.message);
      // }
    } catch (error) {
      throw error;

      // console.log(err)
    }
  }

  async userEmailHandler(user: any, password: string): Promise<void> {
    try {
      const userDetail = await getUserByIdUsecase.read(user);
      const outlet = await outletDataSourceImpl.getById(userDetail.outlet[0]);
      const outletName = outlet.outletName.toLowerCase().split(" ").join("-");
      const emailContent = await userAccountTemplate(
        userDetail,
        outlet,
        outletName,
        password
      );
      // console.log(userDetail,"userDetail","password:",password)
      const emailOption = {
        from: outlet.email,
        email: userDetail.email,
        subject: "User Registration",
        message: emailContent,
      };
      // console.log(emailOption,"emailOption")
      await emailService.sendEmail(emailOption);
    } catch (error) {
      throw error;

      // console.log(err)
    }
  }
}
export default EmailHandler;
