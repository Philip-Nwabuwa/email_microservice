import { Router } from "express";
import emailController from "../controllers/emailController";

const router = Router();

router.post("/welcome", emailController.sendWelcomeEmail);
router.post("/verify", emailController.sendVerificationEmail);
router.post("/reset-password", emailController.sendPasswordResetEmail);
router.post("/newsletter", emailController.sendNewsletter);
router.post("/order-confirmation", emailController.sendOrderConfirmation);

export default router;
