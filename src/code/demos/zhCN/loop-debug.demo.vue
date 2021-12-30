<markdown>
# Loop debug
</markdown>

<template>
  <n-code :code="code" />
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeUnmount } from 'vue'

export default defineComponent({
  setup () {
    const code = ref('')

    const id = setInterval(() => {
      code.value = 'Current: ' + String(new Date())
    }, 1000)

    onBeforeUnmount(() => {
      clearInterval(id)
    })

    return { code }
  }
})
</script>
