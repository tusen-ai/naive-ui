<markdown>
# No icon
</markdown>

<script lang="ts" setup>
import { useMessage } from 'naive-ui'

const message = useMessage()

function createMessage() {
  message.warning('I never needed anybody\'s help in any way', {
    showIcon: false
  })
}
</script>

<template>
  <n-button @click="createMessage">
    No icon
  </n-button>
</template>
