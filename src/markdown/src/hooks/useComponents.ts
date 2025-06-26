import { NImage } from 'naive-ui'
import { h } from 'vue'
import { Components } from 'vue-markdown-unified'

export function useMarkdownComponents(components: Components): Components {
  function renderImg(props: any) {
    return h(NImage, { lazy: true, ...props })
  }

  const Components = {
    img: renderImg,
  }

  return { ...Components, ...components }
}
