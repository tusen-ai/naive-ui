<markdown>
# 事件

`positive-click` & `negative-click`
</markdown>

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

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      handlePositiveClick () {
        message.info('positive click')
      },
      handleNegativeClick () {
        message.info('negative click')
      }
    }
  }
})
</script>
