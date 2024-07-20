<markdown>
  # 事件
</markdown>

<script lang="ts">
import { useMessage } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const message = useMessage()
    return {
      handleOnDragStart: () => {
        message.info('开始滚动')
      },
      handleOnDragMove: () => {
        message.info('滚动中')
      },
      handleOnDragEnd: () => {
        message.info('滚动结束')
      }
    }
  }
})
</script>

<template>
  <n-split
    direction="horizontal"
    style="height: 200px"
    @drag-start="handleOnDragStart"
    @drag-move="handleOnDragMove"
    @drag-end="handleOnDragEnd"
  >
    <template #1>
      Pane 1
    </template>
    <template #2>
      Pane 2
    </template>
  </n-split>
</template>
