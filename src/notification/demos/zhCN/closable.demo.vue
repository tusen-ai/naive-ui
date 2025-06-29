<markdown>
# 不可关闭

通知可以不能被关闭
</markdown>

<script lang="ts" setup>
import { useNotification } from 'naive-ui'

const notification = useNotification()

function handleClick() {
  notification.create({
    title: 'Close Me if You Can',
    duration: 2000,
    closable: false,
    onAfterLeave: () => {
      notification.create({
        title: 'Ha Ha Ha Ha!',
        duration: 2000,
        closable: false,
        onAfterLeave: () => {
          notification.create({
            title: 'No, You Can\'t',
            duration: 2000,
            closable: false
          })
        }
      })
    }
  })
}
</script>

<template>
  <n-button @click="handleClick">
    不能关闭
  </n-button>
</template>
