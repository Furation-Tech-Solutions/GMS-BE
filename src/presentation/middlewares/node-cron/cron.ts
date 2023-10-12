import { AddReservation } from "@data/add-reservation/models/add-reservation-model";
import { UserAccount } from "@data/user-account/models/user-account-model";
import EmailService from "@presentation/services/send-mail";
import cron from "node-cron";

export const sendMailAllUsers = () => {

    try {
        // Schedule the cron job to run every 10 minutes
        cron.schedule('*/10 * * * *', async function () {

            const reservation = await AddReservation.find({date: Date.now()})

            console.log(reservation, "Reservations");

            // Retrieve all user accounts from the database
            // const users = await UserAccount.find({});


            // if (users.length > 0) {
            //     const emailService = new EmailService();
            //     // Iterate over users and send emails to each
            //     users.forEach(async (user) => {
            //         const emailOption = {
            //             email: user.email,
            //             subject: "Your Subject Here",
            //             message: "Your Message Here",
            //         };

            //         try {
            //             // Send the email
            //             await emailService.sendEmail(emailOption);
            //             console.log(`Email sent to ${user.email}`);
            //         } catch (error) {
            //             console.error(`Error sending email to ${user.email}`);
            //         }
            //     });
            // }
        });

    } catch (error) {

        console.error("Cron job error:", error);

    }
};
