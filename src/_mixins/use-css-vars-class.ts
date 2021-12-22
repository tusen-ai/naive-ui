import { Ref, ref, watchEffect } from 'vue'
import hash from '@emotion/hash'
import { c } from '../_utils/cssr'

// window.xxx = 0

export function useCssVarsClass (
  cssVarsRef: Ref<Record<string, string>>
): Ref<string> {
  const cssVarsClassRef = ref('')
  watchEffect(() => {
    // window.xxx -= performance.now()
    const cssVars = cssVarsRef.value
    let style = ''
    for (const key in cssVars) {
      style += `${key}: ${cssVars[key]};`
    }
    const styleHash = hash(style)
    cssVarsClassRef.value = `c${styleHash}`
    c(`.c${styleHash}`, style).mount({
      id: styleHash
    })
    // window.xxx += performance.now()
  })
  return cssVarsClassRef
}
