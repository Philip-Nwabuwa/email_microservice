export interface EmailProviderConfig {
  host: string;
  port: number;
  secure: boolean;
  requiresAuth: boolean;
}

export interface EmailConfig {
  provider: string;
  from: string;
  auth: {
    user: string;
    pass: string;
  };
  settings: EmailProviderConfig;
}

// Common email provider configurations
const emailProviders: Record<string, EmailProviderConfig> = {
  gmail: {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    requiresAuth: true,
  },
  namecheap: {
    host: "mail.privateemail.com",
    port: 587,
    secure: false,
    requiresAuth: true,
  },
  outlook: {
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    requiresAuth: true,
  },
  yahoo: {
    host: "smtp.mail.yahoo.com",
    port: 587,
    secure: false,
    requiresAuth: true,
  },
  cpanel: {
    host: process.env.SMTP_HOST || "mail.domain.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    requiresAuth: true,
  },
  custom: {
    host: process.env.SMTP_HOST || "",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    requiresAuth: true,
  },
};

export const getEmailConfig = (): EmailConfig => {
  const provider = process.env.EMAIL_PROVIDER?.toLowerCase() || "custom";
  const providerConfig = emailProviders[provider] || emailProviders.custom;

  return {
    provider,
    from: process.env.EMAIL_FROM || process.env.SMTP_USER || "",
    auth: {
      user: process.env.SMTP_USER || "",
      pass: process.env.SMTP_PASS || "",
    },
    settings: providerConfig,
  };
};

export const validateEmailConfig = (config: EmailConfig): void => {
  const errors: string[] = [];

  if (!config.from) {
    errors.push("EMAIL_FROM is required");
  }

  if (config.settings.requiresAuth) {
    if (!config.auth.user) {
      errors.push("SMTP_USER is required");
    }
    if (!config.auth.pass) {
      errors.push("SMTP_PASS is required");
    }
  }

  if (config.provider === "custom") {
    if (!config.settings.host) {
      errors.push("SMTP_HOST is required for custom provider");
    }
  }

  if (errors.length > 0) {
    throw new Error(`Email configuration errors: ${errors.join(", ")}`);
  }
};
