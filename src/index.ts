import dotenv from "dotenv";

dotenv.config();

import express from "express";
import emailRoutes from "./routes/emailRoutes";
import logger from "./config/logger";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.use("/api/email", emailRoutes);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    logger.error("Unhandled error", { error: err });
    res.status(500).json({ error: "Internal server error" });
  }
);

app.listen(port, () => {
  logger.info(`Email microservice is running on port ${port}`);
});
