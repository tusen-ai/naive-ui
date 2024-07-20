<markdown>
# Event

`positive-click` & `negative-click`
</markdown>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup() {
    const message = useMessage()
    return {
      handlePositiveClick() {
        message.info('positive click')
      },
      handleNegativeClick() {
        message.info('negative click')
      }
    }
  }
})
</script>

<template>
  <n-popconfirm
    @positive-click="handlePositiveClick"
    @negative-click="handleNegativeClick"
  >
    <template #activator>
      <n-button>Quit Game</n-button>
    </template>
    I heared that players will still be abused after purchasing in some games
    when I watch Bilibili.
  </n-popconfirm>
</template>
