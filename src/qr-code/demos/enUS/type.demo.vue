<markdown>
# Customize Render Type

Customize rendering output by setting `type`, providing two options: `canvas` and `svg`.

</markdown>

<template>
  <n-space>
    <n-qr-code :value="text" type="canvas" />
    <n-qr-code :value="text" type="svg" />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const text = ref('The rain dampened the sky')
    return {
      text
    }
  }
})
</script>
