<markdown>
# Focus debug
</markdown>

<template>
  <n-button @click="handleClick">
    Click me
  </n-button>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { useDialog, NTimePicker } from 'naive-ui'

export default defineComponent({
  setup () {
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
