<markdown>
# Custom Toolbar

You can customize the toolbar using `render-toolbar`.
  </markdown>

<template>
  <n-flex>
    <n-image
      width="100"
      src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
      :render-toolbar="renderToolbar"
    />
    <n-image width="100" :src="url" :render-toolbar="renderCustomToolbar" />
  </n-flex>
</template>
<script lang="ts">
import { defineComponent, ref, h } from 'vue'
import { ToolbarNodes } from '../../src/interface'
import { NButton } from '../../../button'
import { OpenOutline, ClipboardOutline } from '@vicons/ionicons5'
import { NFlex, useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()

    const url = ref('https://picsum.photos/id/10/100/100')

    const renderToolbar = (nodes: ToolbarNodes) => {
      return [
        nodes.prev,
        nodes.zoomIn,
        nodes.zoomOut,
        nodes.next,
        nodes.rotateLeft,
        nodes.rotateRight,
        nodes.originalSize,
        nodes.download,
        nodes.close
      ]
    }

    const renderCustomToolbar = () => {
      return h(NFlex, null, {
        default: () => [
          h(
            NButton,
            {
              circle: true,
              type: 'primary',
              onClick: () => {
                window.open(url.value)
              }
            },
            {
              icon: () => h(OpenOutline)
            }
          ),
          h(
            NButton,
            {
              circle: true,
              type: 'primary',
              onClick: async () => {
                await navigator.clipboard.writeText(url.value)
                message.success('Copied to clipboard')
              }
            },
            {
              icon: () => h(ClipboardOutline)
            }
          )
        ]
      })
    }
    return {
      url,
      renderToolbar,
      renderCustomToolbar
    }
  }
})
</script>
