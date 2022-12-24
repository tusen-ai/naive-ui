import { isBrowser } from './is-browser'

export const isImageSupportNativeLazy =
  isBrowser && 'loading' in document.createElement('img')
