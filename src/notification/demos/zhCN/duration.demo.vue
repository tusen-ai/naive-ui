<markdown>
# 持续时间

自动关闭。
</markdown>

<template>
  <n-button @click="handleClick">
    持续时间 10000ms
  </n-button>
</template>

<script lang="ts">
import { useNotification } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    const notification = useNotification()
    return {
      handleClick () {
        let count = 10
        const n = notification.create({
          title: '平山道 + 雨 = 什么？',
          content: `你有 ${count} 秒来回答这个问题`,
          duration: 10000,
          closable: false,
          onAfterEnter: () => {
            const minusCount = () => {
              count--
              n.content = `你有 ${count} 秒来回答这个问题`
              if (count > 0) {
                window.setTimeout(minusCount, 1000)
              }
            }
            window.setTimeout(minusCount, 1000)
          },
          onAfterLeave: () => {
            notification.create({
              title: '答案是平山河',
              content: '这其实连个冷笑话都算不上',
              duration: 10000
            })
          }
        })
      }
    }
  }
})
</script>
