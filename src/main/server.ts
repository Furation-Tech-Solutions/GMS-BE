import "module-alias/register";
import setupApp from "@main/config/app";
import env from "@main/config/env";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
import * as Message from "@presentation/error-handling/message-error";
import { sendMailConfirmedReservations } from "@presentation/middlewares/node-cron/cron";
import { unblockTableWithCron } from "@presentation/middlewares/node-cron/unblock-table-cron";
import logger from "@presentation/logger";
import { deleteOldGuestsWithCron } from "@presentation/middlewares/node-cron/delete-guests-cron";

const app = setupApp();

// MongoDB connection function
async function connectToDatabase() {
  const dbURL = env.mongoUrl;
  const dbOptions = env.dbOptions;

  try {
    if (dbURL === undefined || dbOptions === undefined) {
      throw ApiError.mongoError();
    }

    await mongoose.connect(dbURL, dbOptions);

    app.listen(env.port, () => {
      console.log(`${Message.SERVER_RUNNING} ${env.port}`);
    });

    sendMailConfirmedReservations();
    unblockTableWithCron();
    deleteOldGuestsWithCron();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);

    // Handle specific error cases if needed
    if (error instanceof ApiError) {
      console.log(error.message, "line 36");
    }

    const intererror = ApiError.internalError();
    // console.log(intererror);
    // // console.log("error is this-",error,"error")
    // if (error instanceof ApiError) {
    //   console.log(error.message);
    // }

    // const intererror = ApiError.internalError();
    // console.log(intererror);
  }
}

// Call the MongoDB connection function
connectToDatabase();

// Set up the Express app
