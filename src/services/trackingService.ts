import { v4 as uuidv4 } from "uuid";
import logger from "../config/logger";

interface EmailTrackingInfo {
  emailId: string;
  to: string;
  template: string;
  sentAt: Date;
  status: "sent" | "failed";
  error?: string;
}

interface TemplateStats {
  total: number;
  sent: number;
  failed: number;
  successRate: number;
}

class TrackingService {
  private emailRecords: Map<string, EmailTrackingInfo>;

  constructor() {
    this.emailRecords = new Map();
  }

  trackEmail(to: string, template: string): string {
    const emailId = uuidv4();
    this.emailRecords.set(emailId, {
      emailId,
      to,
      template,
      sentAt: new Date(),
      status: "sent",
    });
    return emailId;
  }

  trackError(emailId: string, error: string): void {
    const record = this.emailRecords.get(emailId);
    if (record) {
      record.status = "failed";
      record.error = error;
      this.emailRecords.set(emailId, record);
    }
  }

  getEmailStatus(emailId: string): EmailTrackingInfo | undefined {
    return this.emailRecords.get(emailId);
  }

  getEmailStats(): { total: number; sent: number; failed: number } {
    let sent = 0;
    let failed = 0;

    this.emailRecords.forEach((record) => {
      if (record.status === "sent") sent++;
      else failed++;
    });

    return {
      total: this.emailRecords.size,
      sent,
      failed,
    };
  }

  getLastHourStats(): { total: number; sent: number; failed: number } {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    let sent = 0;
    let failed = 0;

    this.emailRecords.forEach((record) => {
      if (record.sentAt >= oneHourAgo) {
        if (record.status === "sent") sent++;
        else failed++;
      }
    });

    return {
      total: sent + failed,
      sent,
      failed,
    };
  }

  getTemplateStats(): Record<string, TemplateStats> {
    const stats: Record<string, { sent: number; failed: number }> = {};

    // Collect stats by template
    this.emailRecords.forEach((record) => {
      if (!stats[record.template]) {
        stats[record.template] = { sent: 0, failed: 0 };
      }
      if (record.status === "sent") {
        stats[record.template].sent++;
      } else {
        stats[record.template].failed++;
      }
    });

    // Calculate success rates
    return Object.entries(stats).reduce((acc, [template, data]) => {
      const total = data.sent + data.failed;
      acc[template] = {
        total,
        sent: data.sent,
        failed: data.failed,
        successRate: total > 0 ? (data.sent / total) * 100 : 0,
      };
      return acc;
    }, {} as Record<string, TemplateStats>);
  }
}

export default new TrackingService();
