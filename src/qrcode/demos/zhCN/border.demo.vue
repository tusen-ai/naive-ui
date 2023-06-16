<markdown>
# 边框

二维码可以没有边框。
</markdown>

<template>
  <n-space vertical>
    <n-qrcode :bordered="false" :value="text" />
    <n-input v-model:value="text" type="text" />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const text = ref('岁月在墙上剥落看见小时候')
    return {
      text
    }
  }
})
</script>
