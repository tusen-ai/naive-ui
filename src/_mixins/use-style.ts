import { CNode } from 'css-render'
import { Ref, onBeforeMount } from 'vue'
import globalStyle from '../_styles/global/index.cssr'

globalStyle.mount({
  id: 'naive-ui-global',
  head: true
})

export default function useStyle (
  mountId: string,
  style: CNode,
  clsPrefixRef?: Ref<string | undefined>
): void {
  onBeforeMount(() => {
    const clsPrefix = clsPrefixRef?.value
    style.mount({
      id: clsPrefix === undefined ? mountId : clsPrefix + mountId,
      head: true,
      props: {
        bPrefix: clsPrefix ? `.${clsPrefix}-` : undefined
      }
    })
  })
}
