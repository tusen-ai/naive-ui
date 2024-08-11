import { type Ref, onMounted, onUnmounted, ref } from 'vue'
import { isBrowser } from '../env/is-browser'

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

export function useBrowserLocation(
  customWindow = isBrowser ? window : null
): Ref<IWindowLocation> {
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
    } = customWindow?.location || {}

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

  const locationState = ref(getWindowLocation())

  const updateLocation = (): void => {
    locationState.value = getWindowLocation()
  }

  onMounted(() => {
    if (customWindow) {
      customWindow.addEventListener('popstate', updateLocation)
      customWindow.addEventListener('hashchange', updateLocation)
    }
  })

  onUnmounted(() => {
    if (customWindow) {
      customWindow.removeEventListener('popstate', updateLocation)
      customWindow.removeEventListener('hashchange', updateLocation)
    }
  })

  return locationState
}
