import express, { Request, Response } from 'express';
import admin from '@main/config/firebase-sdk/firebase-config';
import { ErrorClass } from '@presentation/error-handling/api-error';
import { Either } from 'monet';
import { UserEntity } from '@domain/user-account/entities/user-account';
import { UserAccount } from '@data/user-account/models/user-account-model';


const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24,
  };

  export const sendPushNotification = async (req: Request, res: Response) => {
    try {
      // Validate the request body
      const { title } = req.body;  
      if (!title) {
        return res.status(400).json({ error: 'Missing title or firebaseDeviceToken' });
      }
  
      const users = await UserAccount.find({});
      
      const loggedInUsers = users.filter((user) => user.isLogin === true);
  
      const sendNotifications = loggedInUsers.map(async (user) => {
        const { firstName, lastName, firebaseDeviceToken } = user;
        const payload = {
          notification: {
            title: title,
            body: `Hello, ${firstName} ${lastName}! This is a broadcasted notification.`,
          },
        };


  
        try {
          const response = await admin.messaging().sendToDevice(
            firebaseDeviceToken,
            payload,
            notification_options
          );
  
          if (response.results[0].messageId == null) {
            console.error(response.results[0].error);
            return Promise.reject(response.results[0].error);
          } else {

            return `Notification sent successfully with messageId: ${response.results[0].messageId}`;
          }
        } catch (error) {
          console.error(error);
          return Promise.reject(error);
        }
      });
  
      const results = await Promise.all(sendNotifications);
      res.status(200).json({ message: 'Notifications sent successfully', results });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


