<markdown>
# 用户旅程图
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(`journey
    title My working day
    section Go to work
      Make tea: 5: Me
      Go upstairs: 3: Me
      Do work: 1: Me, Cat
    section Go home
      Go downstairs: 5: Me
      Sit down: 5: Me
`)
</script>

<template>
  <n-mermaid v-model:value="value" />
</template>
