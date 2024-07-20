<markdown>
# 基础用法
</markdown>

<script lang="ts">
import { defineComponent } from 'vue'
import katex from 'katex'

export default defineComponent({
  setup() {
    const equation = '\\displaystyle= \\frac{k(k+1)}{2}+k+1'
    return {
      katex,
      equation
    }
  }
})
</script>

<template>
  <n-config-provider :katex="katex">
    <n-equation :value="equation" />
  </n-config-provider>
</template>
