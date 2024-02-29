<markdown>
  # 颜色

  让二维码不再单调乏味。
</markdown>

<template>
  <n-flex>
    <n-qr-code value="https://www.naiveui.com/" color="#18a058" />
    <n-qr-code
      value="https://www.naiveui.com/"
      color="#409eff"
      background-color="#F5F5F5"
    />
  </n-flex>
  <n-flex vertical>
    <n-color-picker v-model:value="color" />
    <n-qr-code
      value="https://www.naiveui.com/"
      :color="color"
      background-color="#F5F5F5"
    />
  </n-flex>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const color = ref('#225A95FF')
    return {
      color
    }
  }
})
</script>
