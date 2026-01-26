<markdown>
# Sort Event Callback
Use `on-sort` to listen for sorting operations.
</markdown>

<script lang="ts" setup>
import { useMessage } from 'naive-ui'
import { ref } from 'vue'

const message = useMessage()
const value = ref(['Apple', 'Banana', 'Cherry', 'Date'])

function handleSort(from: number, to: number) {
  message.info(`Moved from index ${from} to ${to}`)
}
</script>

<template>
  <n-dynamic-input
    v-model:value="value"
    show-sort-button
    placeholder="Please input"
    @sort="handleSort"
  />
  <pre>{{ JSON.stringify(value, null, 2) }}</pre>
</template>
