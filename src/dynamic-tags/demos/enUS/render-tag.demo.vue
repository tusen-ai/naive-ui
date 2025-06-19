<markdown>
# Custom render for each tag
</markdown>

<script lang="ts" setup>
import { NTag } from 'naive-ui'
import { h, ref } from 'vue'

const tags = ref(['teacher', 'programmer'])

function renderTag(tag: string, index: number) {
  return h(
    NTag,
    {
      type: index < 3 ? 'success' : 'error',
      disabled: index > 3,
      closable: true,
      onClose: () => {
        tags.value.splice(index, 1)
      }
    },
    {
      default: () => tag
    }
  )
}
</script>

<template>
  <n-dynamic-tags v-model:value="tags" :render-tag="renderTag" />
</template>
