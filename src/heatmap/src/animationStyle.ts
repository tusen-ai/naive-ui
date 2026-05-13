import type { ComputedRef, Ref } from 'vue'
import type { MergedTheme, Theme } from '../../_mixins'
import type { HeatmapThemeVars } from '../styles'
import { useSsrAdapter } from '@css-render/vue3-ssr'
import { hash } from 'css-render'
import { inject, onMounted, ref, watchEffect } from 'vue'
import { c } from '../../_utils/cssr'
import { configProviderInjectionKey } from '../../config-provider/src/context'

export function useLoadingStyleClass(
  props: { loading?: boolean },
  themeRef: ComputedRef<MergedTheme<Theme<'Heatmap', HeatmapThemeVars, any>>>
): Ref<string> {
  const loadingClassRef = ref('')
  const adapter = useSsrAdapter()
  const NConfigProvider = inject(configProviderInjectionKey, null)
  const styleMountTarget = NConfigProvider?.styleMountTarget
  onMounted(() => {
    watchEffect(() => {
      if (!props.loading) {
        return
      }
      const {
        self: { loadingColorStart, loadingColorEnd }
      } = themeRef.value
      const loadingColorHash = hash(loadingColorStart) + hash(loadingColorEnd)
      const className = `heatmap-loading-${loadingColorHash}`
      const animationName = `heatmap-loading-animation-${loadingColorHash}`
      loadingClassRef.value = className
      const cnode = c([
        c(
          `.${className}`,
          `
          animation: 2s ${animationName} infinite cubic-bezier(0.36, 0, 0.64, 1);
        `
        ),
        c(
          `@keyframes ${animationName}`,
          `
          0% {
            background: ${loadingColorStart};
          }
          40% {
            background: ${loadingColorEnd};
          }
          80% {
            background: ${loadingColorStart};
          }
          100% {
            background: ${loadingColorStart};
          }
        `
        )
      ])
      // We don't unmount it since we didn't know its mount count
      cnode.mount({
        id: loadingColorHash,
        ssr: adapter,
        parent: styleMountTarget
      })
    })
  })
  return loadingClassRef
}
