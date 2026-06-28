import { AuditLog } from '../models';

class AuditLoggerService {
  private static instance: AuditLoggerService;

  private constructor() {}

  public static getInstance(): AuditLoggerService {
    if (!AuditLoggerService.instance) {
      AuditLoggerService.instance = new AuditLoggerService();
    }
    return AuditLoggerService.instance;
  }

  public async log(action: string, entity: string, entity_id: number | null, user_id: number | null, details?: any): Promise<void> {
    try {
      await AuditLog.create({
        action,
        entity,
        entity_id,
        user_id,
        details: details ? JSON.stringify(details) : null,
      });
    } catch (error) {
      console.error('Error in AuditLoggerService:', error);
      // Fail silently to avoid breaking business flows due to audit log errors
    }
  }
}

export const auditLogger = AuditLoggerService.getInstance();
