<markdown>
# Event
</markdown>

<script lang="ts">
import { useMessage } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const message = useMessage()
    return {
      active: ref(false),
      handleChange(value: boolean) {
        message.info(`Update value: ${value}`)
      }
    }
  }
})
</script>

<template>
  <n-switch v-model:value="active" @update:value="handleChange" />
</template>
