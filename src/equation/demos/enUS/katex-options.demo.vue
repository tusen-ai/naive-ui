<markdown>
# Using katex options
</markdown>

<script lang="ts" setup>
import katex from 'katex'

const equation = `\\f\\relax{x} = \\int_{-\\infty}^\\infty
    \\f\\hat\\xi\\,e^{2 \\pi i \\xi x}
    \\,d\\xi`

const katexOptions = {
  displayMode: true,
  fleqn: true,
  macros: {
    '\\f': '#1f(#2)'
  }
}
</script>

<template>
  <n-config-provider :katex="katex">
    <n-equation :value="equation" :katex-options="katexOptions" />
  </n-config-provider>
</template>
