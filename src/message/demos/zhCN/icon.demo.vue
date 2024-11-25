<markdown>
# 图标
</markdown>

<script lang="ts">
import { MdHourglass } from '@vicons/ionicons4'
import { NIcon, useMessage } from 'naive-ui'
import { defineComponent, h } from 'vue'

export default defineComponent({
  setup() {
    const message = useMessage()
    return {
      createMessage() {
        message.warning('I never needed anybody\'s help in any way', {
          icon: () => h(NIcon, null, { default: () => h(MdHourglass) })
        })
      }
    }
  }
})
</script>

<template>
  <n-button @click="createMessage">
    沙漏图标
  </n-button>
</template>
