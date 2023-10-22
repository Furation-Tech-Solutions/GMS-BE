import { Request, Response } from 'express'; // Import necessary modules and types
// import { Either, ErrorClass, AddReservationEntity } from './types'; // Import your types here
// import { createWhatsAppMessage } from './whatsappTemplates'; // Import your WhatsApp template function
// import { generateEmailContent } from './emailTemplates'; // Import your email template function
import { GetAddReservationById } from '@domain/add-reservation/usecases/get-add-reservation-by-id';
import { AddReservationDataSourceImpl } from '@data/add-reservation/datasources/add-reservation-data-source';
import mongoose from 'mongoose';
import { bookingRequestTemplate, cancelReservationTemplate,leftReservationTemplate, confirmReservationTemplate, reminderEmailTemplate, userAccountTemplate } from '@presentation/services/email-templates';
import EmailService from '@presentation/services/send-mail';
import { createWhatsAppMessage } from '@presentation/services/whatsapp-template';
import WhatsAppService from '@presentation/services/whatsapp-services';
import { UserAccount } from '@data/user-account/models/user-account-model';


const whatsappRecipient = '919881239491'; // Replace with the recipient's phone number
const getAddReservationByIdUsecase=new AddReservationDataSourceImpl(mongoose.connection)
const emailService=new EmailService()
const whatsAppService=new WhatsAppService() 


const managerArr=["amul.shinde@furation.tech","shahzad.shaikh@furation.tech","shehzadmalik123.sm@gmail.com"]


class EmailHandler {
  async handleReservation(id:string): Promise<void> {
    try {
      // Your reservation creation logic here..
        const addReservation = await getAddReservationByIdUsecase.read(id);

        if(addReservation.reservationStatus=="unassigned"){
        const emailContent =await bookingRequestTemplate(addReservation);
        const emailOption = {
          // email:addReservation.client.email,
          email:addReservation.client.email,
          subject: "Booking Request Confirmation",
          message: emailContent,
        };
        await emailService.sendEmail(emailOption);
        }
        if(addReservation.reservationStatus=="Confirm"){
          const emailContent =await confirmReservationTemplate(addReservation);
          const emailOption = {
            // email:addReservation.client.email,
            email:addReservation.client.email,
            subject: "Reservation Confirmation",
            message: emailContent,
          };
          await emailService.sendEmail(emailOption);
          }
          if(addReservation.reservationStatus=="Cancel"){
            const emailContent =await cancelReservationTemplate(addReservation);
            const emailOption = {
              // email:addReservation.client.email,
              email:addReservation.client.email,
              subject: "Reservation cancellation",
              message: emailContent,
            };
            await emailService.sendEmail(emailOption);
            }
            if(addReservation.reservationStatus=="Left"){
              const emailContent =await leftReservationTemplate(addReservation);
              const emailOption = {
                // email:addReservation.client.email,
                email:addReservation.client.email,
                subject: "Thank You for Dining with Us ",
                message: emailContent,
              };
              await emailService.sendEmail(emailOption);
              }
            }
        
        // const user=await UserAccount.find({})

        // user.map(async(res)=>{
        //     if(res.accessLevel=="Superuser"){
        //     try {
            
        //         const emailContent = await operationTeam(addReservation, addReservation.client.email);
        //         const emailOption = {
        //           email: res.email,
        //           subject: "Reservation Confirmation ",
        //           message: emailContent,
        //         };
        //         await emailService.sendEmail(emailOption);
        //       } catch (error) {
        //         console.error(`Error sending email to ${res}: ${error}`);
        //       }
        //     }

           
        //   })

           // Generate whatsapp content
            //    const whatsappMessage = createWhatsAppMessage.message(addReservation);
   
            //    try {
            //     const whatsappResponse = await whatsAppService.sendWhatsAppMessage(whatsappRecipient, whatsappMessage);
            //     // console.log('WhatsApp Response:', whatsappResponse);
            //   } catch (whatsappError) {
            //     console.error('WhatsApp Error:', whatsappError);
            //   }

            // } 
           
       
catch(err){
    console.log(err);
}
  }
  async reminderEmail(user:any): Promise<void> {
    try{
      const addReservation = await getAddReservationByIdUsecase.read(user);
      const emailContent = await reminderEmailTemplate(addReservation);
      const emailOption = {
        // email:addReservation.client.email,
        email:addReservation.client.email,
        subject: "Reservation Reminder",
        message: emailContent,
      };
      // console.log(emailOption,"emailOption inhandler")
      await emailService.sendEmail(emailOption);
    }
    catch(err){
        console.log(err)
    }
//   }
}
          // }
//   async handleLeftReservation(id:string): Promise<void> {
//     try {
//       // Your reservation creation logic here..
//         const addReservation = await getAddReservationByIdUsecase.read(id);

//         const emailContent = postDiningTemplate(addReservation, addReservation.client.email);
//         const emailOption = {
//           // email:addReservation.client.email,
//           email:addReservation.client.email,
//           subject: "Thank You for Dining with Us - We Value Your Feedback",
//           message: emailContent,
//         };
//         await emailService.sendEmail(emailOption);
        

//            // Generate whatsapp content
//             //    const whatsappMessage = createWhatsAppMessage.message(addReservation);
   
//             //    try {
//             //     const whatsappResponse = await whatsAppService.sendWhatsAppMessage(whatsappRecipient, whatsappMessage);
//             //     console.log('WhatsApp Response:', whatsappResponse);
//             //   } catch (whatsappError) {
//             //     console.error('WhatsApp Error:', whatsappError);
//             //   }

//             } 
           
       
// catch(err){
//     console.log(err);
// }
//   }
  async userEmailHandler(user:any): Promise<void> {
    try{
      const emailContent = await userAccountTemplate(user);
      const emailOption = {
        // email:addReservation.client.email,
        email:user.email,
        subject: "User Registration",
        message: emailContent,
      };
      // console.log(emailOption,"emailOption inhandler")
      await emailService.sendEmail(emailOption);
    }
    catch(err){
        console.log(err)
    }
//   }
}
}
export default EmailHandler
