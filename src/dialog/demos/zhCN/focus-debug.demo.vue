<markdown>
# Focus debug
</markdown>

<script lang="ts" setup>
import { NTimePicker, useDialog } from 'naive-ui'
import { h } from 'vue'

const dialog = useDialog()

function handleClick() {
  dialog.info({
    title: 'test',
    content: () => h('div', [h(NTimePicker), h(NTimePicker)])
  })
}
</script>

<template>
  <n-button @click="handleClick">
    Click me
  </n-button>
</template>
