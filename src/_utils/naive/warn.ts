const warnedMessages = new Set()

export function warnOnce (location: string, message: string): void {
  const mergedMessage = `[naive/${location}]: ${message}`
  if (warnedMessages.has(mergedMessage)) return
  warnedMessages.add(mergedMessage)
}

export function warn (location: string, message: string): void {
  console.error(`[naive/${location}]: ${message}`)
}
