import { AddReservation } from "@data/add-reservation/models/add-reservation-model";
import { Client } from "@data/client/models/client_model";
import EmailService from "@presentation/services/send-mail";
import cron from "node-cron";

export const sendMailConfirmedReservations = () => {

    try {
        // Schedule the cron job to run every day at 12 PM
        cron.schedule('*/2 * * * *', async function () {
            try {
                // Find all confirmed reservations for today
                const today = new Date('2023-09-18');
                console.log(today)
                today.setHours(0, 0, 0, 0);
                const reservations = await AddReservation.find({
                    date: today,
                    reservationStatus: 'upcoming'
                });

               console.log(reservations, "reservation121")

                if (reservations.length > 0) {
                    const emailService = new EmailService();

                    // Iterate over reservations and send emails to each client
                    reservations.forEach(async (reservation) => {
                        const client = reservation.client

                        // if (client && client.email) {
                            const emailOption = {
                                email: "amul.shinde@furation.tech",
                                subject: "Your Subject Here",
                                message: "Your Message Here",
                            };

                        try {
                            // Send the email
                            await emailService.sendEmail(emailOption);

                            console.log(`Email sent to "amul.shindefuration.tech"`);
                        } catch (error) {
                            console.error(`Error sending email to" amul.shindefuration.tech"`);
                        }
                    });
                }
            } catch (error) {
                console.error("Error retrieving reservations:", error);
            }
        });

    } catch (error) {
        console.error("Cron job error:", error);
    }
};
