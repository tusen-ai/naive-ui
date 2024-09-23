<markdown>
# 形状
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const text = ref('雨淋湿了天空')
    return {
      text
    }
  }
})
</script>

<template>
  <n-space vertical>
    <n-flex>
      <n-qr-code :value="text" />
      <n-qr-code :value="text" shape="circle" />
      <n-qr-code :value="text" shape="star" />
      <n-qr-code :value="text" shape="heart" />
      <n-qr-code :value="text" shape="cylinder" />
    </n-flex>
    <n-input v-model:value="text" :maxlength="60" type="text" />
  </n-space>
</template>
