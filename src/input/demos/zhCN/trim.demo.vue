<markdown>
# 去除空格

只能去除两端的空格
</markdown>

<template>
  <n-space vertical>
    <n-input v-model:value="value" type="text" trim />
    <n-input v-model:value="value" type="textarea" trim />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(null)
    }
  }
})
</script>
