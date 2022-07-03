export const isImageSupportNativeLazy =
  typeof document !== 'undefined' && 'loading' in document.createElement('img')
