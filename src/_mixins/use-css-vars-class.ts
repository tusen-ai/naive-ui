import { useSsrAdapter } from '@css-render/vue3-ssr'
import { hash } from 'css-render'
import { type ComputedRef, inject, type Ref, ref, watchEffect } from 'vue'
import { throwError } from '../_utils'
import { c } from '../_utils/cssr'
import { configProviderInjectionKey } from '../config-provider/src/context'

export function useThemeClass(
  componentName: string,
  hashRef: Ref<string> | undefined,
  cssVarsRef: ComputedRef<Record<string, string>> | undefined,
  props: { themeOverrides?: unknown, builtinThemeOverrides?: unknown }
): {
    themeClass: Ref<string>
    onRender: () => void
  } {
  if (!cssVarsRef)
    throwError('useThemeClass', 'cssVarsRef is not passed')

  const NConfigProvider = inject(configProviderInjectionKey, null)

  const mergedThemeHashRef = NConfigProvider?.mergedThemeHashRef
  const styleMountTarget = NConfigProvider?.styleMountTarget

  const themeClassRef = ref('')

  const ssrAdapter = useSsrAdapter()

  let renderCallback: (() => void) | undefined

  const hashClassPrefix = `__${componentName}`
  const mountStyle = (): void => {
    let finalThemeHash = hashClassPrefix
    const hashValue = hashRef ? hashRef.value : undefined
    const themeHash = mergedThemeHashRef?.value
    if (themeHash)
      finalThemeHash += `-${themeHash}`
    if (hashValue)
      finalThemeHash += `-${hashValue}`
    const { themeOverrides, builtinThemeOverrides } = props
    if (themeOverrides) {
      finalThemeHash += `-${hash(JSON.stringify(themeOverrides))}`
    }
    if (builtinThemeOverrides) {
      finalThemeHash += `-${hash(JSON.stringify(builtinThemeOverrides))}`
    }
    themeClassRef.value = finalThemeHash
    renderCallback = () => {
      const cssVars = cssVarsRef.value
      let style = ''
      for (const key in cssVars) {
        style += `${key}: ${cssVars[key]};`
      }
      c(`.${finalThemeHash}`, style).mount({
        id: finalThemeHash,
        ssr: ssrAdapter,
        parent: styleMountTarget
      })
      renderCallback = undefined
    }
  }

  watchEffect(() => {
    mountStyle()
  })

  return {
    themeClass: themeClassRef,
    onRender: () => {
      renderCallback?.()
    }
  }
}
