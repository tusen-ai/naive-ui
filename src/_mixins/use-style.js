import { onBeforeMount } from 'vue'

export default function useStyle (mountId, style) {
  onBeforeMount(() => {
    style.mount({
      id: mountId
    })
  })
}
