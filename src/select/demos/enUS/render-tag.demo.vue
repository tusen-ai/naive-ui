<markdown>
# Customize tag rendering

Give the tag a little color.
</markdown>

<script lang="ts">
import type { SelectRenderTag } from 'naive-ui'
import { NTag } from 'naive-ui'
import { defineComponent, h, ref } from 'vue'

export default defineComponent({
  setup() {
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
          label: 'Daze today',
          value: 'value1',
          type: 'success'
        },
        {
          label: 'Work is not finished',
          value: 'value2',
          type: 'warning'
        },
        {
          label: 'Work overtime in the evening',
          value: 'value3',
          type: 'error'
        }
      ],
      renderTag
    }
  }
})
</script>

<template>
  <n-select
    v-model:value="value"
    multiple
    :render-tag="renderTag"
    :options="options"
  />
</template>
