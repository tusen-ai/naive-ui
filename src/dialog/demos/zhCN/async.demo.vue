<markdown>
# 异步

对话框可以异步。
</markdown>

<template>
  <n-button @click="handleClick">
    成功
  </n-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useDialog } from 'naive-ui'

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000))
const countDown = (second: number) => `倒计时 ${second} 秒`

export default defineComponent({
  setup () {
    const dialog = useDialog()
    return {
      handleClick () {
        const d = dialog.success({
          title: '异步',
          content: '点击，倒计时 3 秒',
          positiveText: '确认',
          onPositiveClick: () => {
            d.loading = true
            return new Promise((resolve) => {
              sleep()
                .then(() => {
                  d.content = countDown(2)
                  return sleep()
                })
                .then(() => {
                  d.content = countDown(1)
                  return sleep()
                })
                .then(() => {
                  d.content = countDown(0)
                })
                .then(resolve)
            })
          }
        })
      }
    }
  }
})
</script>
