import mongoose from "mongoose";
import { Router } from "express"
import  {sendPushNotification}  from "@presentation/middlewares/notification/notification-middleware"



export const notificationRouter = Router();


notificationRouter.post('/firebase/notification', sendPushNotification)