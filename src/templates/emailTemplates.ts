interface TemplateData {
  [key: string]: string | number;
}

interface EmailTemplate {
  subject: string;
  html: string;
}

const templates = {
  welcome: (data: TemplateData): EmailTemplate => ({
    subject: "Welcome to NectarNosh Haven!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome to NectarNosh Haven!</h2>
        <p>Hi ${data.name},</p>
        <p>Thank you for joining NectarNosh Haven. We're excited to have you on board!</p>
        <p>Start exploring our services and discover what we have to offer.</p>
        <p>Best regards,<br>The NectarNosh Haven Team</p>
      </div>
    `,
  }),

  verifyEmail: (data: TemplateData): EmailTemplate => ({
    subject: "Verify Your Email Address",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Verify Your Email</h2>
        <p>Hi ${data.name},</p>
        <p>Please use the following OTP to verify your email address:</p>
        <h3 style="background: #f5f5f5; padding: 10px; text-align: center; font-size: 24px;">${data.otp}</h3>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <p>Best regards,<br>The NectarNosh Haven Team</p>
      </div>
    `,
  }),

  resetPassword: (data: TemplateData): EmailTemplate => ({
    subject: "Password Reset Request",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Reset Your Password</h2>
        <p>Hi ${data.name},</p>
        <p>We received a request to reset your password. Use this OTP to proceed:</p>
        <h3 style="background: #f5f5f5; padding: 10px; text-align: center; font-size: 24px;">${data.otp}</h3>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <p>Best regards,<br>The NectarNosh Haven Team</p>
      </div>
    `,
  }),

  newsletter: (data: TemplateData): EmailTemplate => ({
    subject: String(data.subject),
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>${data.subject}</h2>
        <div>${data.content}</div>
        <p style="font-size: 12px; color: #666; margin-top: 20px;">
          You're receiving this email because you subscribed to our newsletter.
          <br>
          <a href="\${unsubscribeUrl}">Unsubscribe</a>
        </p>
      </div>
    `,
  }),

  orderConfirmation: (data: TemplateData): EmailTemplate => ({
    subject: `Order Confirmed - #${data.orderNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Order Confirmation</h2>
        <p>Hi ${data.name},</p>
        <p>Thank you for your order! Here are your order details:</p>
        <p><strong>Order Number:</strong> #${data.orderNumber}</p>
        <p><strong>Order Total:</strong> $${data.total}</p>
        <p>We'll send you another email when your order ships.</p>
        <p>Best regards,<br>The NectarNosh Haven Team</p>
      </div>
    `,
  }),
};

export default templates;
