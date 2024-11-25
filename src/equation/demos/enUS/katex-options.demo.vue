<markdown>
# Using katex options
</markdown>

<script lang="ts">
import katex from 'katex'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const equation = `\\f\\relax{x} = \\int_{-\\infty}^\\infty
    \\f\\hat\\xi\\,e^{2 \\pi i \\xi x}
    \\,d\\xi`
    return {
      katex,
      katexOptions: {
        displayMode: true,
        fleqn: true,
        macros: {
          '\\f': '#1f(#2)'
        }
      },
      equation
    }
  }
})
</script>

<template>
  <n-config-provider :katex="katex">
    <n-equation :value="equation" :katex-options="katexOptions" />
  </n-config-provider>
</template>
