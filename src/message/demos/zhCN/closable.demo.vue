<markdown>
# 可关闭

设定 `closable` 使 Message 可以通过点击关闭。
</markdown>

<script lang="ts" setup>
import { useMessage } from 'naive-ui'

const message = useMessage()

function createMessage() {
  message.info('I don\'t know why nobody told you how to unfold your love', {
    closable: true,
    duration: 5000
  })
}
</script>

<template>
  <n-button @click="createMessage">
    打开信息
  </n-button>
</template>
