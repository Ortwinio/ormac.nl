export const contactLimits = {
  // Vercel accepts up to 4.5 MB per request. Reserve space for multipart fields.
  totalFileBytes: 4_000_000,
  requestBytes: 4_250_000,
  files: 5,
} as const;

export const documentExtensions = [".pdf", ".xls", ".xlsx"];
