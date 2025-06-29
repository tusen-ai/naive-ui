<markdown>
# Customize Render Type

Customize rendering output by setting `type`, providing two options: `canvas` and `svg`.
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const text = ref('The rain dampened the sky')
</script>

<template>
  <n-space>
    <n-qr-code :value="text" type="canvas" />
    <n-qr-code :value="text" type="svg" />
  </n-space>
</template>
