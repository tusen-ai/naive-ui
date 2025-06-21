<markdown>
# 格式化
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const time = ref(null)
</script>

<template>
  <n-time-picker v-model:value="time" format="h:mm a" />
</template>
