<markdown>
# 可关闭

用于 Modal 的时候，你可能需要这个属性。
</markdown>

<template>
  <n-card title="卡片" closable @close="handleClose">
    卡片内容
  </n-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      handleClose () {
        message.info('Card Close')
      }
    }
  }
})
</script>

<style>
.n-card {
  max-width: 300px;
}
</style>
