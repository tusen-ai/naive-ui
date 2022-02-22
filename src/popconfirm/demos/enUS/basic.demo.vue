<markdown>
# Basic
</markdown>

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

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      handlePositiveClick () {
        message.info('Yes')
      },
      handleNegativeClick () {
        message.info('No')
      }
    }
  }
})
</script>
