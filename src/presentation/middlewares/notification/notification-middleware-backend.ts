

import admin from '@main/config/firebase-sdk/firebase-config';
import { UserAccount } from '@data/user-account/models/user-account-model';
import logger from '@presentation/logger';
import mongoose from 'mongoose';

const notificationOptions = {
  priority: 'high',
  timeToLive: 60 * 60 * 24,
}; 


export async function sendNotification(title: string, outletId: string | undefined) {
  
  try {
    // Fetch users with isLogin === true
    const loggedInUsers = await UserAccount.find({ 
      outlet: new mongoose.Types.ObjectId(outletId), // Convert outletId string to ObjectId
      isLogin: true,
     });


    if (loggedInUsers.length === 0) {
      return { error: 'No logged-in users found' };
    }

    const results: { messageId: string; deviceId: string }[] = [];

    const failureResults: { messageId: string; deviceId: string }[] = [];

    for (const user of loggedInUsers) {
        if (user.firebaseDeviceToken && user.firebaseDeviceToken.length > 0) {
          const payload = {
            notification: {
              title: title,
              body: `Powered by Reserve 1st.`,
            },
          };

          const tokens = user.firebaseDeviceToken;
  
          try {

            // console.log(tokens, "tokens")
            const response = await admin.messaging().sendMulticast({
              tokens: tokens,
              notification: payload.notification,
              options: notificationOptions,
            });


            const successResults = response.responses.filter((result: any) => result.success);


            successResults.forEach((result: any) => {

              results.push({
                messageId: result.messageId,
                deviceId: result.canonicalRegistrationToken || result.token,
              });
            });
    
            const failures = response.responses.filter((result: any) => !result.success);


            // const failedTokens = failures.map((result: any) => result.canonicalRegistrationToken || result.token);
            // user.firebaseDeviceToken = user.firebaseDeviceToken.filter((token: string) => !failedTokens.includes(token));

            try {

              await user.save();

            } catch (error) {
              logger.errro(error)
            }
  
            failures.forEach((result: any) => {
              failureResults.push({
                messageId: result.messageId,
                deviceId: result.canonicalRegistrationToken || result.token,
              });
            });
          } catch (error) {
            logger.error('Token is expired:', 'error');
          }
        }
      }

    if (results.length > 0) {
      return {
        message: 'Notifications sent successfully',
        results: results,
        failedResults: failureResults,
      };
    } else {
      return { error: 'No valid tokens found for sending notifications' };
    }
  } catch (error) {
    console.error(error);
    return { error: 'Internal server error' };
  }
}



 export async function sendPushNotifications(newtitle: string, outletId: string | undefined) {
  const title = newtitle;
 await sendNotification(title, outletId);

}


  