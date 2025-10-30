<markdown>
# Customize checked value

Use `checked-value` and `unchecked-value` to customize respective values.
</markdown>

<script lang="ts" setup>
import { useMessage } from 'naive-ui'

const message = useMessage()
function handleUpdateValue(value: string) {
  message.info(value)
}
</script>

<template>
  <n-switch
    checked-value="Foo"
    unchecked-value="Bar"
    @update:value="handleUpdateValue"
  />
</template>
