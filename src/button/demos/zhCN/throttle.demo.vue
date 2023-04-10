<markdown>
# 节流
</markdown>

<template>
  <n-button @click="handleClick">
    快速连续点击，节流300
  </n-button>
  <n-button :throttle="2000" @click="handleClickTwoSeconds">
    快速连续点击，节流2s
  </n-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      handleClick () {
        message.info('Button Clicked')
      },
      handleClickTwoSeconds () {
        message.info('Button Clicked after wait two Seconds')
      }
    }
  }
})
</script>
