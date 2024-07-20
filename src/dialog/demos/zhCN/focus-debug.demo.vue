<markdown>
# Focus debug
</markdown>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { NTimePicker, useDialog } from 'naive-ui'

export default defineComponent({
  setup() {
    const dialog = useDialog()
    return {
      handleClick: () => {
        dialog.info({
          title: 'test',
          content: () => h('div', [h(NTimePicker), h(NTimePicker)])
        })
      }
    }
  }
})
</script>

<template>
  <n-button @click="handleClick">
    Click me
  </n-button>
</template>
