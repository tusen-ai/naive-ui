import { isBrowser } from './is-browser'
export const isChrome = isBrowser && 'chrome' in window
export const isFirefox = isBrowser && navigator.userAgent.includes('Firefox')
export const isSafari =
  isBrowser && navigator.userAgent.includes('Safari') && !isChrome
