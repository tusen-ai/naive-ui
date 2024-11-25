<markdown>
# Customizing checked value

Use `checked-value` and `unchecked-value` to customize value.
</markdown>

<script lang="ts">
import { useMessage } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const message = useMessage()
    return {
      handleUpdateChecked(value: boolean) {
        message.info(String(value))
      }
    }
  }
})
</script>

<template>
  <n-checkbox
    checked-value="Foo"
    unchecked-value="Bar"
    @update:checked="handleUpdateChecked"
  >
    FooBar
  </n-checkbox>
</template>
