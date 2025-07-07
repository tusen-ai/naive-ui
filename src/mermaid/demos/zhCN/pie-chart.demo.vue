<markdown>
# 饼图
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(`pie title Pets adopted by volunteers
    "Dogs" : 386
    "Cats" : 85
    "Rats" : 15
`)
</script>

<template>
  <n-mermaid v-model:value="value" />
</template>
