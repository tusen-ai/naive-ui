<markdown>
  # Icon

  You can put some representative icons.
</markdown>

<template>
  <n-space>
    <n-qr-code
      value="https://www.naiveui.com/"
      icon-src="https://www.naiveui.com/assets/naivelogo-93278402.svg"
      error-correction-level="H"
    />
    <n-qr-code
      value="https://www.naiveui.com/"
      icon-src="https://www.naiveui.com/assets/naivelogo-93278402.svg"
      icon-background-color="#333"
      error-correction-level="H"
    />
    <n-qr-code
      value="https://www.naiveui.com/"
      icon-src="https://www.naiveui.com/assets/naivelogo-93278402.svg"
      :icon-size="32"
      error-correction-level="H"
    />
  </n-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {}
  }
})
</script>
