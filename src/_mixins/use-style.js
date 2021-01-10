import { onBeforeMount } from 'vue'
import globalStyle from '../_styles/global/index.cssr.js'

globalStyle.mount({
  id: 'naive-ui-global'
})

export default function useStyle (mountId, style) {
  onBeforeMount(() => {
    style.mount({
      id: mountId
    })
  })
}
