import { adminRouter } from "@presentation/routes/admin-routes";
import { mediaRoutes } from "@presentation/routes/outlet-mediasource-routes";
import { outletRouter } from "@presentation/routes/outlet-routes";
import { roomRouter } from "@presentation/routes/room-routes";
import { seatingAreaRouter } from "@presentation/routes/seating-area-routes";
import { bookedByNameRouter } from "@presentation/routes/booked-by-name-routes";
import { superAdminRouter } from "@presentation/routes/super-admin-routes";
import { guestRouter } from "@presentation/routes/guest-route";
import { clientRouter } from "@presentation/routes/client-route";
import { tagCategoryRouter } from "@presentation/routes/tag-category-route";

import { type Express, Router } from "express";
import { serverNameRouter } from "@presentation/routes/server-name-routes";

export default (app: Express): void => {
  const router = Router();

  app.get("/health", (req, res) => {
    res.status(200).json({ message: "ok", });
  });

  app.use("/api/v1/admin", adminRouter);
  app.use("/api/v1/outlet", outletRouter);
  app.use("/api/v1/outlet/media", mediaRoutes);
  app.use("/api/v1/people/bookedByName", bookedByNameRouter);
  app.use("/api/v1/people/serverName", serverNameRouter);
  app.use("/api/v1/room", roomRouter);
  app.use("/api/v1/seatingarea", seatingAreaRouter);

  app.use("/api/v1/superadmin", superAdminRouter);
  app.use("/api/v1/guests", guestRouter);
  app.use("/api/v1/clients", clientRouter);
  app.use("/api/v1/tagcategory", tagCategoryRouter);
  app.use(router);
};

