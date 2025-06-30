<markdown>
# Customizing checked value

Use `checked-value` and `unchecked-value` to customize value.
</markdown>

<script lang="ts" setup>
import { useMessage } from 'naive-ui'

const message = useMessage()
function handleUpdateChecked(value: boolean) {
  message.info(String(value))
}
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
