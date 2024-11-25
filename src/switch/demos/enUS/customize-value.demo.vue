<markdown>
# Customize checked value

Use `checked-value` and `unchecked-value` to customize respective values.
</markdown>

<script lang="ts">
import { useMessage } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const message = useMessage()
    return {
      handleUpdateValue(value: string) {
        message.info(value)
      }
    }
  }
})
</script>

<template>
  <n-switch
    checked-value="Foo"
    unchecked-value="Bar"
    @update:value="handleUpdateValue"
  />
</template>
