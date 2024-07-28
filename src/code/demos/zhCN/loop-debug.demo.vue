<markdown>
# Loop debug
</markdown>

<script lang="ts">
import { defineComponent, onBeforeUnmount, ref } from 'vue'

export default defineComponent({
  setup() {
    const code = ref('')

    const id = setInterval(() => {
      code.value = `Current: ${String(new Date())}`
    }, 1000)

    onBeforeUnmount(() => {
      clearInterval(id)
    })

    return { code }
  }
})
</script>

<template>
  <n-code :code="code" />
</template>
