<markdown>
# Event
</markdown>

<template>
  <n-switch v-model:value="active" @update:value="handleChange" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      active: ref(false),
      handleChange (value: boolean) {
        message.info(`Update value: ${value}`)
      }
    }
  }
})
</script>
