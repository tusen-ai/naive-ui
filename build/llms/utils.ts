export function formatLogMessage(message: string, error?: unknown): string {
  if (!error)
    return message
  if (error instanceof Error)
    return `${message}: ${error.stack ?? error.message}`
  return `${message}: ${String(error)}`
}
