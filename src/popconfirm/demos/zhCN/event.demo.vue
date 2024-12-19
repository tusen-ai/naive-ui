<markdown>
# 事件

`positive-click` & `negative-click`
</markdown>

<script lang="ts">
import { useMessage } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const message = useMessage()
    return {
      handlePositiveClick() {
        message.info('positive click')
      },
      handleNegativeClick() {
        message.info('negative click')
      }
    }
  }
})
</script>

<template>
  <n-popconfirm
    @positive-click="handlePositiveClick"
    @negative-click="handleNegativeClick"
  >
    <template #trigger>
      <n-button>退出游戏</n-button>
    </template>
    我看 B 站的时候，听说有些游戏冲钱也是找罪受。
  </n-popconfirm>
</template>
