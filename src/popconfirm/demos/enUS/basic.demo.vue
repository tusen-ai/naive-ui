<markdown>
# Basic
</markdown>

<script lang="ts" setup>
import { useMessage } from 'naive-ui'

const message = useMessage()

function handlePositiveClick() {
  message.info('Yes')
}

function handleNegativeClick() {
  message.info('No')
}
</script>

<template>
  <n-popconfirm
    @positive-click="handlePositiveClick"
    @negative-click="handleNegativeClick"
  >
    <template #trigger>
      <n-button>Quote</n-button>
    </template>
    Things pass us by. Nobody can catch them. That's the way we live our lives.
  </n-popconfirm>
</template>
