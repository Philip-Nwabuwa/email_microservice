import rateLimit from "express-rate-limit";
import { createError } from "../utils/error";

export const emailRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message:
    "Too many email requests from this IP, please try again after 15 minutes",
  handler: (req, res) => {
    throw createError("Rate limit exceeded", 429);
  },
});
