<markdown>
# throttle
</markdown>

<template>
  <n-button @click="handleClick">
    click me quikcly，throttle 300ms
  </n-button>
  <n-button :throttle="2000" @click="handleClickTwoSeconds">
    click me quikcly，throttle 2s
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
