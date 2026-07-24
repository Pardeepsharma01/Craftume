/**
 * Application Configuration
 * ==========================
 * Typed config object for app-wide settings.
 * No feature logic — structural/foundational only.
 */

interface AppConfig {
  APP_NAME: string;
  MAX_UPLOAD_SIZE: number; // bytes
  SUPPORTED_FILE_TYPES: readonly string[];
  DEFAULT_TEMPLATE: string;
}

export const appConfig: AppConfig = {
  APP_NAME: "Craftume",
  MAX_UPLOAD_SIZE: 5 * 1024 * 1024, // 5 MB
  SUPPORTED_FILE_TYPES: ["application/pdf", "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  DEFAULT_TEMPLATE: "classic",
} as const;
