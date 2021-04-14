import { CNode } from 'css-render'
import { ComputedRef, onBeforeMount } from 'vue'
import globalStyle from '../_styles/global/index.cssr'

globalStyle.mount({
  id: 'naive-ui-global',
  head: true
})

export default function useStyle (
  mountId: string,
  style: CNode,
  clsPrefixRef?: ComputedRef<string | undefined>
): void {
  onBeforeMount(() => {
    const clsPrefix = clsPrefixRef?.value
    style.mount({
      id: mountId,
      head: true,
      props: {
        bPrefix: clsPrefix ? `.${clsPrefix}-` : undefined
      }
    })
  })
}
