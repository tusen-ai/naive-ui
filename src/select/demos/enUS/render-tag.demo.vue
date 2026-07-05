<markdown>
# Customize tag rendering

Give the tag a little color.
</markdown>

<script lang="ts" setup>
import type { SelectRenderTag } from 'naive-ui'
import { NTag } from 'naive-ui'
import { h, ref } from 'vue'

const value = ref([])
const options = [
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
]

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
</script>

<template>
  <n-select
    v-model:value="value"
    multiple
    :render-tag="renderTag"
    :options="options"
  />
</template>
