import { ComputedRef, Ref, ref, inject, watchEffect } from 'vue'
import { hash } from 'css-render'
import { useSsrAdapter } from '@css-render/vue3-ssr'
import { configProviderInjectionKey } from '../config-provider/src/context'
import { throwError } from '../_utils'
import { c } from '../_utils/cssr'

export function useThemeClass (
  componentName: string,
  hashRef: Ref<string> | undefined,
  cssVarsRef: ComputedRef<Record<string, string>> | undefined,
  props: { themeOverrides?: unknown }
): {
    themeClass: Ref<string>
    onRender: () => void
  } {
  if (!cssVarsRef) throwError('useThemeClass', 'cssVarsRef is not passed')

  const mergedThemeHashRef = inject(
    configProviderInjectionKey,
    null
  )?.mergedThemeHashRef

  const themeClassRef = ref('')

  const ssrAdapter = useSsrAdapter()

  let renderCallback: (() => void) | undefined

  const mountStyle = (): void => {
    let finalThemeHash = componentName
    const hashValue = hashRef ? hashRef.value : undefined
    const themeHash = mergedThemeHashRef?.value
    if (themeHash) finalThemeHash += '-' + themeHash
    if (hashValue) finalThemeHash += '-' + hashValue
    if (props.themeOverrides) {
      finalThemeHash += '-' + hash(JSON.stringify(props.themeOverrides))
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
        ssr: ssrAdapter
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

export const emptyThemeClassHandle: {
  themeClass?: Ref<string>
  onRender?: () => void
} = {
  themeClass: undefined,
  onRender: undefined
}
