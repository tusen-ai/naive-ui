<markdown>
# 自定义标签渲染

给标签一点颜色看看。
</markdown>

<template>
  <n-select
    v-model:value="value"
    multiple
    :render-tag="renderTag"
    :options="options"
  />
</template>

<script lang="ts">
import { defineComponent, ref, h } from 'vue'
import { NTag, SelectRenderTag } from 'naive-ui'

export default defineComponent({
  setup () {
    const renderTag: SelectRenderTag = ({ option, handleClose }) => {
      return h(
        NTag,
        {
          type: option.type as 'success' | 'warning' | 'error',
          closable: true,
          onMousedown: (e: FocusEvent) => {
            e.preventDefault()
          },
          onClose: (e: MouseEvent) => {
            e.stopPropagation()
            handleClose()
          }
        },
        { default: () => option.label }
      )
    }
    return {
      value: ref([]),
      options: [
        {
          label: '今天在摸鱼',
          value: 'value1',
          type: 'success'
        },
        {
          label: '工作没做完',
          value: 'value2',
          type: 'warning'
        },
        {
          label: '晚上要加班',
          value: 'value3',
          type: 'error'
        }
      ],
      renderTag
    }
  }
})
</script>
