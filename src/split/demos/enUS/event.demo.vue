<markdown>
  # Event

  </markdown>

<template>
  <n-split
    direction="horizontal"
    style="height: 200px"
    @move-start="handleOnMoveStart"
    @moving="handleOnMoving"
    @move-end="handleOnMoveEnd"
  >
    <template #first>
      <div :style="{ height: '100%' }">
        Pane 1
      </div>
    </template>

    <template #second>
      <div :style="{ height: '100%' }">
        Pane 2
      </div>
    </template>
  </n-split>
</template>

<script lang="ts">
import { useMessage } from 'naive-ui'
import { defineComponent } from 'vue'
import { throttle } from 'lodash-es'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      handleOnMoveStart: () => {
        message.info('Move Start')
      },
      handleOnMoving: throttle(() => {
        message.info('Moving')
      }, 500),
      handleOnMoveEnd: () => {
        message.info('Move end')
      }
    }
  }
})
</script>
