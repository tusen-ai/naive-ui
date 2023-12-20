<markdown>
  # 事件
</markdown>

<template>
  <n-split
    direction="horizontal"
    style="height: 200px"
    @move-start="handleOnMoveStart"
    @moving="handleOnMoving"
    @move-end="handleOnMoveEnd"
  >
    <template #1>
      Pane 1
    </template>
    <template #2>
      Pane 2
    </template>
  </n-split>
</template>

<script lang="ts">
import { useMessage } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      handleOnMoveStart: () => {
        message.info('开始滚动')
      },
      handleOnMoving: () => {
        message.info('滚动中')
      },
      handleOnMoveEnd: () => {
        message.info('滚动结束')
      }
    }
  }
})
</script>
