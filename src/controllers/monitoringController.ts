import { Request, Response, NextFunction } from "express";
import emailService from "../services/emailService";
import trackingService from "../services/trackingService";
import { createError } from "../utils/error";

class MonitoringController {
  async checkHealth(req: Request, res: Response, next: NextFunction) {
    try {
      const smtpStatus = await emailService.verifyConnection();
      
      return res.json({
        status: "healthy",
        smtp: smtpStatus ? "connected" : "disconnected",
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(createError("Service is unhealthy", 503));
    }
  }

  async getMetrics(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = trackingService.getEmailStats();
      
      return res.json({
        metrics: {
          ...stats,
          successRate: stats.total > 0 ? (stats.sent / stats.total) * 100 : 0,
        },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(createError("Failed to retrieve metrics", 500));
    }
  }

  async getDetailedMetrics(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = trackingService.getEmailStats();
      const lastHourStats = trackingService.getLastHourStats();
      const templateStats = trackingService.getTemplateStats();
      
      return res.json({
        overview: {
          ...stats,
          successRate: stats.total > 0 ? (stats.sent / stats.total) * 100 : 0,
        },
        lastHour: lastHourStats,
        byTemplate: templateStats,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(createError("Failed to retrieve detailed metrics", 500));
    }
  }
}

export default new MonitoringController();
