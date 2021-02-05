import { inject } from 'vue'
import { LoadingBarApiInjection } from './interface'

export function useLoadingBar (): LoadingBarApiInjection | undefined {
  return inject('loadingBar')
}
