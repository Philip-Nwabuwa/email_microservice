import nodemailer, { Transporter } from "nodemailer";
import logger from "../config/logger";
import { getEmailConfig, validateEmailConfig } from "../config/emailConfig";

export interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html: string;
}

class EmailService {
  private transporter: Transporter;
  private config: ReturnType<typeof getEmailConfig>;

  constructor() {
    this.config = getEmailConfig();
    validateEmailConfig(this.config);

    this.transporter = nodemailer.createTransport({
      host: this.config.settings.host,
      port: this.config.settings.port,
      secure: this.config.settings.secure,
      auth: this.config.settings.requiresAuth ? this.config.auth : undefined,
    });
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const mailOptions = {
        from: this.config.from,
        ...options,
      };

      const info = await this.transporter.sendMail(mailOptions);
      logger.info("Email sent successfully", { messageId: info.messageId });
      return true;
    } catch (error) {
      logger.error("Error sending email", { error });
      throw error;
    }
  }

  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      logger.info("SMTP connection verified successfully");
      return true;
    } catch (error) {
      logger.error("SMTP connection verification failed", { error });
      return false;
    }
  }
}

export default new EmailService();
