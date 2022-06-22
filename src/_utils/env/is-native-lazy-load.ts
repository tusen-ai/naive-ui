export const isNativeSupportLazyLoadingImage =
  'document' in globalThis && 'loading' in document.createElement('img')
