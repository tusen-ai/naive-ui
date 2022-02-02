import { ComputedRef, Ref, ref, inject, watchEffect } from 'vue'
import { hash } from 'css-render'
import { configProviderInjectionKey } from '../config-provider/src/context'
import { throwError } from '../_utils'
import { c } from '../_utils/cssr'

export function useCssVarsClass (
  componentName: string,
  hashRef: Ref<string> | undefined,
  cssVarsRef: ComputedRef<Record<string, string>> | undefined,
  props: { themeOverrides?: unknown }
): Ref<string> {
  if (!cssVarsRef) throwError('useCssVarsClass', 'cssVarsRef is not passed')

  const mergedThemeHashRef = inject(
    configProviderInjectionKey,
    null
  )?.mergedThemeHashRef

  const cssVarsClassRef = ref('')

  const mountStyle = (): void => {
    const cssVars = cssVarsRef.value

    let style = ''
    for (const key in cssVars) {
      style += `${key}: ${cssVars[key]};`
    }

    let finalThemeHash = componentName
    const hashValue = hashRef ? hashRef.value : undefined
    const themeHash = mergedThemeHashRef?.value
    if (themeHash) finalThemeHash += '-' + themeHash
    if (hashValue) finalThemeHash += '-' + hashValue
    if (props.themeOverrides) {
      finalThemeHash += '-' + hash(JSON.stringify(props.themeOverrides))
    }
    cssVarsClassRef.value = finalThemeHash

    c(`.${finalThemeHash}`, style).mount({
      id: finalThemeHash
    })
  }

  watchEffect(() => {
    mountStyle()
  })

  return cssVarsClassRef
}
