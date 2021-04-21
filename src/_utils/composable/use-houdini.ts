import { onBeforeMount } from 'vue'

let houdiniRegistered = false

export function useHoudini (): void {
  onBeforeMount(() => {
    if (!houdiniRegistered) {
      houdiniRegistered = true
      if ((window?.CSS as any)?.registerProperty) {
        ;(CSS as any).registerProperty({
          name: '--color-start',
          syntax: '<color>',
          inherits: false,
          initialValue: '#0000'
        })
        ;(CSS as any).registerProperty({
          name: '--color-end',
          syntax: '<color>',
          inherits: false,
          initialValue: '#0000'
        })
      }
    }
  })
}
