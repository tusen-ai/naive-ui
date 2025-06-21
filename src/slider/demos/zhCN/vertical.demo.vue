<markdown>
# 垂直

设定 `vertical` 来启用垂直模式，它的高度默认依赖于容器的高度，你也可以自定义高度。
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref([20, 70])
const marks = {
  0: '0°C',
  20: '20°C',
  37: '37°C',
  100: '100°C'
}
</script>

<template>
  <n-space style="height: 300px; justify-content: center">
    <n-slider :default-value="77" vertical />
    <n-slider :default-value="20" vertical reverse />
    <n-slider :default-value="30" vertical disabled />
    <n-slider v-model:value="value" :marks="marks" vertical range />
  </n-space>
</template>
