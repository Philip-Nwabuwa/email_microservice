import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

import emailRoutes from "./routes/emailRoutes";
import monitoringRoutes from "./routes/monitoringRoutes";
import logger from "./config/logger";
import { errorHandlerMiddleware } from "./middleware/errorHandler";
import { emailRateLimiter } from "./middleware/rateLimiter";

const app = express();
const port = process.env.PORT || 4000;

// Security middleware
app.use(helmet());
app.use(cors());

// Body parser
app.use(express.json());

// Rate limiting for email endpoints
app.use("/api/email", emailRateLimiter);

// Routes
app.use("/api/email", emailRoutes);
app.use("/api/monitoring", monitoringRoutes);

// Error handling
app.use(errorHandlerMiddleware);

app.listen(port, () => {
  logger.info(`Email microservice is running on port ${port}`);
});
