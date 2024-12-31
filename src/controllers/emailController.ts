import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import emailService, { EmailOptions } from "../services/emailService";
import logger from "../config/logger";
import templates from "../templates/emailTemplates";
import { createError } from "../utils/error";

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

class EmailController {
  async sendWelcomeEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = emailSchema.validate(req.body);
      if (error) {
        throw createError(error.details[0].message, 400);
      }

      const template = templates.welcome(value);
      const emailData: EmailOptions = {
        to: value.to,
        ...template,
      };
      await emailService.sendEmail(emailData);

      return res
        .status(200)
        .json({ success: true, message: "Welcome email sent successfully" });
    } catch (error: any) {
      logger.error("Error sending welcome email", { error });
      next(error);
    }
  }

  async sendVerificationEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = otpSchema.validate(req.body);
      if (error) {
        throw createError(error.details[0].message, 400);
      }

      const template = templates.verifyEmail(value);
      const emailData: EmailOptions = {
        to: value.to,
        ...template,
      };
      await emailService.sendEmail(emailData);

      return res
        .status(200)
        .json({
          success: true,
          message: "Verification email sent successfully",
        });
    } catch (error: any) {
      logger.error("Error sending verification email", { error });
      next(error);
    }
  }

  async sendPasswordResetEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { error, value } = otpSchema.validate(req.body);
      if (error) {
        throw createError(error.details[0].message, 400);
      }

      const template = templates.resetPassword(value);
      const emailData: EmailOptions = {
        to: value.to,
        ...template,
      };
      await emailService.sendEmail(emailData);

      return res
        .status(200)
        .json({
          success: true,
          message: "Reset password email sent successfully",
        });
    } catch (error: any) {
      logger.error("Error sending reset password email", { error });
      next(error);
    }
  }

  async sendNewsletter(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = newsletterSchema.validate(req.body);
      if (error) {
        throw createError(error.details[0].message, 400);
      }

      const template = templates.newsletter(value);
      const emailData: EmailOptions = {
        to: value.to,
        ...template,
      };
      await emailService.sendEmail(emailData);

      return res
        .status(200)
        .json({ success: true, message: "Newsletter sent successfully" });
    } catch (error: any) {
      logger.error("Error sending newsletter", { error });
      next(error);
    }
  }

  async sendOrderConfirmation(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = orderSchema.validate(req.body);
      if (error) {
        throw createError(error.details[0].message, 400);
      }

      const template = templates.orderConfirmation(value);
      const emailData: EmailOptions = {
        to: value.to,
        ...template,
      };
      await emailService.sendEmail(emailData);

      return res
        .status(200)
        .json({
          success: true,
          message: "Order confirmation email sent successfully",
        });
    } catch (error: any) {
      logger.error("Error sending order confirmation", { error });
      next(error);
    }
  }
}

export default new EmailController();
