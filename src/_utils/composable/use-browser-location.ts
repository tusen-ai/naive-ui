import { onMounted, onUnmounted, Ref, ref } from 'vue'

const hasWindow = typeof window !== 'undefined'
const defaultWindow = hasWindow ? window : null

export interface IWindowLocation {
  hash?: string
  host?: string
  hostname?: string
  href?: string
  origin?: string
  pathname?: string
  port?: string
  protocol?: string
  search?: string
}

export const useBrowserLocation = (
  window = defaultWindow
): Ref<IWindowLocation> => {
  const getWindowLocation = (): IWindowLocation => {
    const {
      hash,
      host,
      hostname,
      href,
      origin,
      pathname,
      port,
      protocol,
      search
    } = window?.location || {}

    return {
      hash,
      host,
      hostname,
      href,
      origin,
      pathname,
      port,
      protocol,
      search
    }
  }
  const updateLocation = (): void => {
    locationState.value = getWindowLocation()
  }

  const locationState = ref(getWindowLocation())

  onMounted(() => {
    if (window) {
      window.addEventListener('popstate', updateLocation)
      window.addEventListener('hashchange', updateLocation)
    }
  })

  onUnmounted(() => {
    if (window) {
      window.removeEventListener('popstate', updateLocation)
      window.removeEventListener('hashchange', updateLocation)
    }
  })

  return locationState
}
