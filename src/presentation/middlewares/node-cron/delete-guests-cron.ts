import { Guest } from "@data/guest/models/guest_model";
import { formattedDateFunc } from "@presentation/utils/formatt-date";
import cron from "node-cron";

export const deleteOldGuestsWithCron = () => {
  try {
    cron.schedule(
      "0 0 28-31 * *", // Runs every month(28-31) at midnight
      async function () {
        try {
          const oneMonthPreviousDate = formattedDateFunc(new Date(), -1);

          const oldGuests = await Guest.find(
            { date: { $lt: oneMonthPreviousDate } },
            "_id"
          );

          if (oldGuests.length > 0) {
            // Delete old guests
            const deleteResult = await Guest.deleteMany({
              date: { $lt: oneMonthPreviousDate },
            });

            console.log(`${deleteResult.deletedCount} guests deleted.`);
          } else {
            console.log("No guests to delete.");
          }
        } catch (error: any) {
          console.error({ status: false, error: error.message });
        }
      },
      {
        scheduled: true,
        timezone: "Asia/Kolkata",
      }
    );
  } catch (cronError) {
    console.error({ message: "Cron job error:", error: cronError });
  }
};
