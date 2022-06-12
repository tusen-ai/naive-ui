import { isBrowser } from '../env/is-browser'

let houdiniRegistered = false

export function useHoudini (): void {
  if (!isBrowser) return
  if (!window.CSS) return
  if (!houdiniRegistered) {
    houdiniRegistered = true
    if ('registerProperty' in window?.CSS) {
      try {
        ;(CSS as any).registerProperty({
          name: '--n-color-start',
          syntax: '<color>',
          inherits: false,
          initialValue: '#0000'
        })
        ;(CSS as any).registerProperty({
          name: '--n-color-end',
          syntax: '<color>',
          inherits: false,
          initialValue: '#0000'
        })
      } catch (e) {}
    }
  }
}
