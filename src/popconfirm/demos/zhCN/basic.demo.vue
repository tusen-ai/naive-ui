<markdown>
# 基础用法
</markdown>

<template>
  <n-popconfirm
    @positive-click="handlePositiveClick"
    @negative-click="handleNegativeClick"
  >
    <template #trigger>
      <n-button>引用</n-button>
    </template>
    一切都将一去杳然，任何人都无法将其捕获。
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
        message.info('是的')
      },
      handleNegativeClick () {
        message.info('并不')
      }
    }
  }
})
</script>
