<markdown>
  # Event
</markdown>

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

<script lang="ts">
import { useMessage } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      handleOnDragStart: () => {
        message.info('Move Start')
      },
      handleOnDragMove: () => {
        message.info('Moving')
      },
      handleOnDragEnd: () => {
        message.info('Move end')
      }
    }
  }
})
</script>
