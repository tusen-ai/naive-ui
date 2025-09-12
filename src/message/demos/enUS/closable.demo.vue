<markdown>
# Closable

Set `closable` to make message closable by a click.
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
    Create a Message
  </n-button>
</template>
