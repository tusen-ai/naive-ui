import { inject } from 'vue'
import { throwError } from '../../_utils'
import { loadingBarApiInjectionKey } from './context'
import type { LoadingBarApiInjection } from './LoadingBarProvider'

export function useLoadingBar(): LoadingBarApiInjection {
  const loadingBar = inject(loadingBarApiInjectionKey, null)
  if (loadingBar === null) {
    throwError(
      'use-loading-bar',
      'No outer <n-loading-bar-provider /> founded.'
    )
  }
  return loadingBar
}
