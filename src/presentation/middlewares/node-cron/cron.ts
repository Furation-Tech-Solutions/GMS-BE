import { AddReservationDataSourceImpl } from "@data/add-reservation/datasources/add-reservation-data-source";
import { AddReservation } from "@data/add-reservation/models/add-reservation-model";
import EmailHandler from "@presentation/nodemailer/configuration/mail-handler";
import { formattedDateFunc } from "@presentation/utils/formatt-date";
import mongoose from "mongoose";
import cron from "node-cron";

const  addReservationDataSourceImpl = new AddReservationDataSourceImpl(mongoose.connection)

export const sendMailConfirmedReservations = () => {
    try {
        cron.schedule('*/2 * * * *', async function () { // Scheduled for 12:00 PM IST
            try {
                // Get the formatted date
                const formattedDate = formattedDateFunc(new Date());

                // // Find all confirmed reservations for today
                // const reservations = await AddReservation.find({
                //     date: formattedDate,
                //     reservationStatus: 'confirmed'
                // }).populate('client');

                const reservations =  await addReservationDataSourceImpl.getAll({
                        date: formattedDate,
                        reservationStatus: 'confirmed'
                    })


                if (reservations.length > 0) {
                    const emailService = new EmailHandler();

                    // Iterate over reservations and send emails to each client
                    for (const reservation of reservations) {
                        if (reservation.client && reservation.client.email) {

                            await emailService.reminderEmail((reservation._id).toString());

                            // try {
                            //     // Send the email
                            //     await emailService.sendEmail(emailOption);
                            //     console.log(`Email sent to ${reservation.client.email}`);
                            // } catch (emailError) {
                            //     console.error(`Error sending email to ${reservation.client.email}:`, emailError);
                            // }
                        }
                    }
                }
            } catch (reservationsError) {
                console.error("Error retrieving reservations:", reservationsError);
            }
        }, {
            scheduled: true,
            timezone: "Asia/Kolkata"
        });
    } catch (cronError) {
        console.error("Cron job error:", cronError);
    }
};
