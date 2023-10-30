

import admin from '@main/config/firebase-sdk/firebase-config';
import { UserAccount } from '@data/user-account/models/user-account-model';

const notificationOptions = {
  priority: 'high',
  timeToLive: 60 * 60 * 24,
};


export async function sendNotification(title: string) {
  try {
    // Fetch users with isLogin === true
    const loggedInUsers = await UserAccount.find({ isLogin: true });

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
              body: `Hello! This is a broadcasted notification.`,
            },
          };

          const tokens = user.firebaseDeviceToken;
  
          try {

            console.log(tokens, "tokens")
            const response = await admin.messaging().sendMulticast({
              tokens: tokens,
              notification: payload.notification,
              options: notificationOptions,
            });


            console.log(response, "response");

            const successResults = response.responses.filter((result: any) => result.success);


            successResults.forEach((result: any) => {

              results.push({
                messageId: result.messageId,
                deviceId: result.canonicalRegistrationToken || result.token,
              });

            });
  
            const failures = response.responses.filter((result: any) => !result.success);
  
            failures.forEach((result: any) => {
              failureResults.push({
                messageId: result.messageId,
                deviceId: result.canonicalRegistrationToken || result.token,
              });
            });
          } catch (error) {
            console.error('Error sending multicast message:', error);
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


// Example of how to call the sendNotification function

 export async function sendNotificationExample(newtitle: string) {
  const title = newtitle;

  console.log(title, newtitle, "title")
  const notificationResult = await sendNotification(title);
  console.log(notificationResult);
}

// Call this function to send a notification
// sendNotificationExample();
