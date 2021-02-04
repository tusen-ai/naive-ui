import { CNode } from 'css-render'
import { onBeforeMount } from 'vue'
import globalStyle from '../_styles/global/index.cssr'

globalStyle.mount({
  id: 'naive-ui-global'
})

export default function useStyle (mountId: string, style: CNode): void {
  onBeforeMount(() => {
    style.mount({
      id: mountId
    })
  })
}
