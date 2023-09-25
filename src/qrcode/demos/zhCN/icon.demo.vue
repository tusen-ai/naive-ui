<markdown>
  # 图标

可以放一些代表性的 Icon
</markdown>

<template>
  <n-space>
    <n-qrcode
      value="https://www.naiveui.com/"
      icon="https://www.naiveui.com/assets/naivelogo-93278402.svg"
      error-correction-level="H"
    />
    <n-qrcode
      value="https://www.naiveui.com/"
      icon="https://www.naiveui.com/assets/naivelogo-93278402.svg"
      icon-background-color="#ccc"
      error-correction-level="H"
    />
    <n-qrcode
      value="https://www.naiveui.com/"
      icon="https://www.naiveui.com/assets/naivelogo-93278402.svg"
      :icon-size="48"
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
