<markdown>
# Basic
</markdown>

<template>
  <n-equation :value="equation" :katex="katex" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import katex from 'katex'

export default defineComponent({
  setup () {
    const equation = '\\displaystyle= \\frac{k(k+1)}{2}+k+1'
    return {
      katex,
      equation
    }
  }
})
</script>
