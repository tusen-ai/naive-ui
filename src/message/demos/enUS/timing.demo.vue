<markdown>
# Timing

Specify the duration of messages.
</markdown>

<script lang="ts" setup>
import { useMessage } from 'naive-ui'

const message = useMessage()

function createMessage() {
  message.info('I don\'t know why nobody told you how to unfold your love', {
    duration: 5000
  })
}
</script>

<template>
  <n-button @click="createMessage">
    Last for 5 second
  </n-button>
</template>
