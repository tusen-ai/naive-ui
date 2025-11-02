<markdown>
  # Event
</markdown>

<script lang="ts" setup>
import { useMessage } from 'naive-ui'

const message = useMessage()
function handleOnDragStart() {
  message.info('Move Start')
}
function handleOnDragMove() {
  message.info('Moving')
}
function handleOnDragEnd() {
  message.info('Move end')
}
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
