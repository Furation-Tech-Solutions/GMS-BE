import { Table } from "@data/table/models/table-model";
import cron from "node-cron";

export const unblockTableWithCron = () => {
  try {
    cron.schedule(
      "0 0 * * *",
      async function () {
        // Scheduled for 12:00 PM IST
        try {
          // Find all confirmed blocked tables
          const blockTableList = await Table.find({
            isBlocked: true,
          });

          // collect all blocked table ids in one array
          const arrayOfTableIds: any[] = blockTableList.map((table) => {
            return table._id;
          });


          if (arrayOfTableIds.length > 0) {

            // Update all tables in the provided array
            const updateResult = await Table.updateMany(
              { _id: { $in: arrayOfTableIds } }, // Find tables by their IDs
              { isBlocked: false } // Set isBlocked to the specified value
            );
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
