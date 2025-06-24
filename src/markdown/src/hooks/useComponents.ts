import { NImage } from 'naive-ui'
import { h } from 'vue'

export function useMarkdownComponents() {
  function renderImg(props: any) {
    return h(NImage, { style: { width: '100%', height: 'auto' }, lazy: true, ...props })
  }

  const Components = {
    img: renderImg,
  }

  return Components
}
