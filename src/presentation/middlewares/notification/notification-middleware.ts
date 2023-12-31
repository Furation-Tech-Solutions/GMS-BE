import express, { Request, Response } from 'express';
import admin from '@main/config/firebase-sdk/firebase-config';
import { UserAccount } from '@data/user-account/models/user-account-model';

const notificationOptions = {
  priority: 'high',
  timeToLive: 60 * 60 * 24,
};

export const sendPushNotification = async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Missing title' });
    }

    // Fetch users with isLogin === true
    const loggedInUsers = await UserAccount.find({ isLogin: true });

    if (loggedInUsers.length === 0) {
      return res.status(400).json({ error: 'No logged-in users found' });
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
      res.status(200).json({
        message: 'Notifications sent successfully',
        results: results,
        failedResults: failureResults,
      });
    } else {
      res.status(400).json({ error: 'No valid tokens found for sending notifications' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

