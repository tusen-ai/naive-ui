import { inject } from 'vue'
import { loadingBarApiInjectionKey } from './LoadingBarProvider'
import type { LoadingBarApiInjection } from './LoadingBarProvider'

export function useLoadingBar (): LoadingBarApiInjection | undefined {
  return inject(loadingBarApiInjectionKey)
}
