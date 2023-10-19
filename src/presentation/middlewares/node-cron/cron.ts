import { AddReservation } from "@data/add-reservation/models/add-reservation-model";
import { UserAccount } from "@data/user-account/models/user-account-model";
import EmailService from "@presentation/services/send-mail";
import cron from "node-cron";

export const   = () => {

    try {
        // Schedule the cron job to run every day at 12 PM
        cron.schedule('0 12 * * *', async function () {
            // Find all confirmed reservations for today
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const reservations = await AddReservation.find({ date: today, reservationStatus: 'confirmed' }).populate('client');

            console.log(reservations);

            if (reservations.length > 0) {
                const emailService = new EmailService();
                // Iterate over reservations and send emails to each client
                reservations.forEach(async (reservation) => {
                    // Assuming reservation has a clientEmail property
                    const emailOption = {
                        email: "",
                        subject: "Your Subject Here",
                        message: "Your Message Here",
                    };

                    try {
                        // Send the email
                        await emailService.sendEmail(emailOption);
                        console.log(`Email sent to ${reservation.client}`);
                    } catch (error) {
                        console.error(`Error sending email to ${reservation.client}`);
                    }
                });
            }
        });

    } catch (error) {
        console.error("Cron job error:", error);
    }
};
