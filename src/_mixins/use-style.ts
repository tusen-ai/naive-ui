import type { CNode } from 'css-render'
import { type Ref, onBeforeMount, inject } from 'vue'
import { useSsrAdapter } from '@css-render/vue3-ssr'
import { configProviderInjectionKey } from '../config-provider/src/context'
import globalStyle from '../_styles/global/index.cssr'
import { throwError } from '../_utils'
import { cssrAnchorMetaName } from './common'

export default function useStyle (
  mountId: string,
  style: CNode,
  clsPrefixRef: Ref<string | undefined>
): void {
  if (!style) {
    if (__DEV__) throwError('use-style', 'No style is specified.')
    return
  }
  const ssrAdapter = useSsrAdapter()
  const NConfigProvider = inject(configProviderInjectionKey, null)
  const mountStyle = (): void => {
    const clsPrefix = clsPrefixRef.value
    style.mount({
      id: clsPrefix === undefined ? mountId : clsPrefix + mountId,
      head: true,
      anchorMetaName: cssrAnchorMetaName,
      props: {
        bPrefix: clsPrefix ? `.${clsPrefix}-` : undefined
      },
      ssr: ssrAdapter
    })
    if (!NConfigProvider?.preflightStyleDisabled) {
      globalStyle.mount({
        id: 'n-global',
        head: true,
        anchorMetaName: cssrAnchorMetaName,
        ssr: ssrAdapter
      })
    }
  }
  if (ssrAdapter) {
    mountStyle()
  } else {
    onBeforeMount(mountStyle)
  }
}
