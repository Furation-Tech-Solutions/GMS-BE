import { adminRouter } from "@presentation/routes/admin-routes";
import { mediaRoutes } from "@presentation/routes/outlet-mediasource-routes";
import { outletRouter } from "@presentation/routes/outlet-routes";
import { reservationStatusRouter } from "@presentation/routes/reservation-status-routes";
import { roomRouter } from "@presentation/routes/room-routes";
import { seatingAreaRouter } from "@presentation/routes/seating-area-routes";
import { superAdminRouter } from "@presentation/routes/super-admin-routes";
import { tableRouter } from "@presentation/routes/table-routes";

import { type Express, Router } from "express";

export default (app: Express): void => {
  const router = Router();

  app.get("/health", (req, res) => {
    res.status(200).json({ message: "ok" });
  });

  app.use("/api/v1/admin", adminRouter);
  app.use("/api/v1/outlet", outletRouter);
  app.use(router);
  app.use("/api/v1/outlet/media", mediaRoutes);

  app.use("/api/v1/superadmin", superAdminRouter);
  app.use("/api/v1/room", roomRouter);
  app.use("/api/v1/seatingarea", seatingAreaRouter);
  app.use("/api/v1/table", tableRouter);
  app.use("/api/v1/reservation/status", reservationStatusRouter);
};
