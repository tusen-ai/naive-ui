<markdown>
# 使用组件

有的时候你可能想把它用作一个组件。
</markdown>

<template>
  <n-dialog
    title="确认"
    content="你确定"
    negative-text="不确认"
    positive-text="确认"
    @positive-click="handlePositiveClick"
    @negative-click="handleNegativeClick"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      handleNegativeClick () {
        message.warning('取消')
      },
      handlePositiveClick () {
        message.success('确认')
      }
    }
  }
})
</script>
