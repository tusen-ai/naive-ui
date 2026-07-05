<markdown>
# Loop debug
</markdown>

<script lang="ts" setup>
import { onBeforeUnmount, ref } from 'vue'

const code = ref('')

const id = setInterval(() => {
  code.value = `Current: ${String(new Date())}`
}, 1000)

onBeforeUnmount(() => {
  clearInterval(id)
})
</script>

<template>
  <n-code :code="code" />
</template>
