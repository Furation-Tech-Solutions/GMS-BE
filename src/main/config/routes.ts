import { shiftRouter } from "@presentation/routes/availibility/shift/shift-routes";
import { accessRuleRouter } from "@presentation/routes/availibility/access-rule/access-rule-routes";
import { blackoutDayRouter } from "@presentation/routes/availibility/black-out-day/black-out-day-routes";
import { programScheduleRouter } from "@presentation/routes/availibility/daily-programs/daily-program-routes";
import { accessLevelRouter } from "@presentation/routes/access-level-route";
import { adminRouter } from "@presentation/routes/admin-routes";
import { mediaRoutes } from "@presentation/routes/outlet-mediasource-routes";
import { outletRouter } from "@presentation/routes/outlet-routes";
import { reservationStatusRouter } from "@presentation/routes/reservation-status-routes";
import { roomRouter } from "@presentation/routes/room-routes";
import { seatingAreaRouter } from "@presentation/routes/seating-area-routes";
import { bookedByNameRouter } from "@presentation/routes/booked-by-name-routes";
import { tableRouter } from "@presentation/routes/table-routes";
import { guestRouter } from "@presentation/routes/guest-route";
import { clientRouter } from "@presentation/routes/client-route";
import { clientTagCategoryRouter } from "@presentation/routes/client-tag-category-route";

import { reservationTagCategoryRouter } from "@presentation/routes/reservation-tag-category-route";
import { bookingRequestRouter } from "@presentation/routes/bookingRequest-route";
import { type Express, Router } from "express";
import { addReservationRouter } from "@presentation/routes/add-reservation-routes.ts/add-reservation-route";
import { clientTagRouter } from "@presentation/routes/client-tag-route";
import { reservationTagRouter } from "@presentation/routes/reservation-tag-route";
import { serverNameRouter } from "@presentation/routes/server-name-routes";
import { taxRateRouter } from "@presentation/routes/tax-rate-route";
import { notificationRouter } from "@presentation/routes/notification/notification-route";
import { userRouter } from "@presentation/routes/user-route";
import { superAdminRouter } from "@presentation/routes/super-admin-routes";
import { checkInCheckOutRouter } from "@presentation/routes/client-management/check-in-out-route";
import { sendNotificationExample } from "@presentation/middlewares/notification/notification-middleware-backend";
import logger from "@presentation/logger";



export default (app: Express): void => {
  const router = Router();

  app.get("/health", (req, res) => {
    
    const sessionId = "1234";
    logger.info('This is an info message', { sessionId } )
    res.status(200).json({ message: "ok" });
  });

  app.use("/api/v1/shift", shiftRouter);
  app.use("/api/v1/accessrule", accessRuleRouter);
  app.use("/api/v1/blackoutday", blackoutDayRouter);
  app.use("/api/v1/program", programScheduleRouter);
  app.get("/test", (req, res) => {
    res.status(200).json({ message: "ok" });
  });
  app.use("/api/v1/admin", adminRouter);
  app.use("/api/v1/outlet", outletRouter);
  app.use("/api/v1/media", mediaRoutes);
  app.use("/api/v1/people/user", userRouter);
  app.use("/api/v1/people/accessLevel", accessLevelRouter);
  app.use("/api/v1/people/taxRate", taxRateRouter);
  app.use("/api/v1/people/bookedByName", bookedByNameRouter);
  app.use("/api/v1/people/serverName", serverNameRouter);

  app.use("/api/v1/room", roomRouter);
  app.use("/api/v1/seatingarea", seatingAreaRouter);
  app.use("/api/v1/table", tableRouter);
  app.use("/api/v1/reservation/status", reservationStatusRouter);

  app.use("/api/v1/superadmin", superAdminRouter);
  app.use("/api/v1/guests", guestRouter);
  app.use("/api/v1/clients", clientRouter);
  app.use("/api/v1/clients/tag/category", clientTagCategoryRouter);
  app.use("/api/v1/reservation/tag/category", reservationTagCategoryRouter);
  app.use("/api/v1/booking/request", bookingRequestRouter);
  app.use("/api/v1/add/reservation", addReservationRouter);
  app.use("/api/v1/client/tag", clientTagRouter);
  app.use("/api/v1/reservation/tag", reservationTagRouter);
  app.use("/api/v1", notificationRouter);
  app.use("/api/v1/check", checkInCheckOutRouter);

  app.use(router);
};
