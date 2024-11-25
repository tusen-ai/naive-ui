<markdown>
# Basic
</markdown>

<script lang="ts">
import { useMessage } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const message = useMessage()
    return {
      handlePositiveClick() {
        message.info('Yes')
      },
      handleNegativeClick() {
        message.info('No')
      }
    }
  }
})
</script>

<template>
  <n-popconfirm
    @positive-click="handlePositiveClick"
    @negative-click="handleNegativeClick"
  >
    <template #trigger>
      <n-button>Quote</n-button>
    </template>
    Things pass us by. Nobody can catch them. That's the way we live our lives.
  </n-popconfirm>
</template>
