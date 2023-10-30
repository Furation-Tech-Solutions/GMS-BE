import express, { type Express } from "express";
import setupRoutes from "@main/config/routes";

import cors from "cors";
import cookieParser from "cookie-parser";

export default (): Express => {
  const app = express();
  app.use(express.json());

  app.use(
    cors({
      origin: "*",
    })
  );

  app.use(cookieParser());

  app.use(express.urlencoded({ extended: true }));
  setupRoutes(app);
  return app;
};
