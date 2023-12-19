<markdown>
# 基础用法

基础二维码。
</markdown>

<template>
  <n-space vertical>
    <n-qr-code :value="text" />
    <n-input v-model:value="text" :maxlength="60" type="text" />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const text = ref('雨淋湿了天空')
    return {
      text
    }
  }
})
</script>
