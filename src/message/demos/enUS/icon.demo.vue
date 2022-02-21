<markdown>
# Icon
</markdown>

<template>
  <n-button @click="createMessage">
    Hourglass Icon
  </n-button>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { NIcon, useMessage } from 'naive-ui'
import { MdHourglass } from '@vicons/ionicons4'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      createMessage () {
        message.warning("I never needed anybody's help in any way", {
          icon: () => h(NIcon, null, { default: () => h(MdHourglass) })
        })
      }
    }
  }
})
</script>
