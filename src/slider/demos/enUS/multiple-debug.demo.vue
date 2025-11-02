<markdown>
# More than 2 handles

Although I don't know where it can be used, but it looks cool.
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref([50, 70, 80, 90])
</script>

<template>
  <n-space vertical>
    <n-slider v-model:value="value" range :step="1" />
  </n-space>
</template>
