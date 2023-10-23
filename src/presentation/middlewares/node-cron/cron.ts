import { AddReservationDataSourceImpl } from "@data/add-reservation/datasources/add-reservation-data-source";
import EmailHandler from "@presentation/nodemailer/configuration/mail-handler";
import { formattedDateFunc } from "@presentation/utils/formatt-date";
import mongoose from "mongoose";
import cron from "node-cron";

const  addReservationDataSourceImpl = new AddReservationDataSourceImpl(mongoose.connection)

export const sendMailConfirmedReservations = () => {
    try {
        cron.schedule('0 12 * * *', async function () { // Scheduled for 12:00 PM IST
            try {
                // Get the formatted date
                const formattedDate = formattedDateFunc(new Date());

                const reservations =  await addReservationDataSourceImpl.getAll({
                        date: formattedDate,
                        reservationStatus: 'booked'
                    });


                if (reservations.length > 0) {
                    const emailService = new EmailHandler();

                    // Iterate over reservations and send emails to each client
                    for (const reservation of reservations) {
                        if (reservation.client && reservation.client.email) {
                            await emailService.reminderEmail((reservation._id).toString());
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
