<markdown>
# Event

`positive-click` & `negative-click`
</markdown>

<script lang="ts" setup>
import { useMessage } from 'naive-ui'

const message = useMessage()

function handlePositiveClick() {
  message.info('positive click')
}

function handleNegativeClick() {
  message.info('negative click')
}
</script>

<template>
  <n-popconfirm
    @positive-click="handlePositiveClick"
    @negative-click="handleNegativeClick"
  >
    <template #trigger>
      <n-button>Quit Game</n-button>
    </template>
    I heared that players will still be abused after purchasing in some games
    when I watch Bilibili.
  </n-popconfirm>
</template>
