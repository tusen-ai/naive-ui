export function debug (location, message, ...rest) {
  console.debug(`[naive/${location}]: ${message}`, ...rest)
}
