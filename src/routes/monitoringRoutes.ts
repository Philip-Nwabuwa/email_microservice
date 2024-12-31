import { Router } from "express";
import monitoringController from "../controllers/monitoringController";

const router = Router();

router.get("/health", monitoringController.checkHealth);
router.get("/metrics", monitoringController.getMetrics);
router.get("/metrics/detailed", monitoringController.getDetailedMetrics);

export default router;
