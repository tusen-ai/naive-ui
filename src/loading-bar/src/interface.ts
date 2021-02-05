export interface LoadingBarApiInjection {
  start: () => void
  finish: () => void
  error: () => void
}
