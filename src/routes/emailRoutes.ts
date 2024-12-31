import { Router, Request, Response } from "express";
import Joi from "joi";
import emailService, { EmailOptions } from "../services/emailService";
import logger from "../config/logger";
import templates from "../templates/emailTemplates";

const router = Router();

// Validation schemas
const emailSchema = Joi.object({
  to: Joi.string().email().required(),
  name: Joi.string().required(),
});

const otpSchema = emailSchema.keys({
  otp: Joi.string().length(6).required(),
});

const newsletterSchema = emailSchema.keys({
  subject: Joi.string().required(),
  content: Joi.string().required(),
});

const orderSchema = emailSchema.keys({
  orderNumber: Joi.string().required(),
  total: Joi.number().required(),
});

// Welcome email
router.post("/welcome", async (req: Request, res: Response) => {
  try {
    const { error, value } = emailSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const template = templates.welcome(value);
    const emailData: EmailOptions = {
      to: value.to,
      ...template,
    };
    await emailService.sendEmail(emailData);

    return res.status(200).json({ message: "Welcome email sent successfully" });
  } catch (error: any) {
    logger.error("Error sending welcome email", { error });
    return res.status(500).json({ error: error.message });
  }
});

// Verify email
router.post("/verify", async (req: Request, res: Response) => {
  try {
    const { error, value } = otpSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const template = templates.verifyEmail(value);
    const emailData: EmailOptions = {
      to: value.to,
      ...template,
    };
    await emailService.sendEmail(emailData);

    return res.status(200).json({ message: "Verification email sent successfully" });
  } catch (error: any) {
    logger.error("Error sending verification email", { error });
    return res.status(500).json({ error: error.message });
  }
});

// Reset password
router.post("/reset-password", async (req: Request, res: Response) => {
  try {
    const { error, value } = otpSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const template = templates.resetPassword(value);
    const emailData: EmailOptions = {
      to: value.to,
      ...template,
    };
    await emailService.sendEmail(emailData);

    return res.status(200).json({ message: "Reset password email sent successfully" });
  } catch (error: any) {
    logger.error("Error sending reset password email", { error });
    return res.status(500).json({ error: error.message });
  }
});

// Newsletter
router.post("/newsletter", async (req: Request, res: Response) => {
  try {
    const { error, value } = newsletterSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const template = templates.newsletter(value);
    const emailData: EmailOptions = {
      to: value.to,
      ...template,
    };
    await emailService.sendEmail(emailData);

    return res.status(200).json({ message: "Newsletter sent successfully" });
  } catch (error: any) {
    logger.error("Error sending newsletter", { error });
    return res.status(500).json({ error: error.message });
  }
});

// Order confirmation
router.post("/order-confirmation", async (req: Request, res: Response) => {
  try {
    const { error, value } = orderSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const template = templates.orderConfirmation(value);
    const emailData: EmailOptions = {
      to: value.to,
      ...template,
    };
    await emailService.sendEmail(emailData);

    return res.status(200).json({ message: "Order confirmation email sent successfully" });
  } catch (error: any) {
    logger.error("Error sending order confirmation", { error });
    return res.status(500).json({ error: error.message });
  }
});

export default router;
