<markdown>
# Focus debug
</markdown>

<script lang="ts">
import { NTimePicker, useDialog } from 'naive-ui'
import { defineComponent, h } from 'vue'

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
