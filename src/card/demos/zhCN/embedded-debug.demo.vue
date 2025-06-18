<markdown>
# embedded debug
</markdown>

<script setup lang="ts">
import { ref } from 'vue'

const showModal = ref(false)
</script>

<template>
  <n-button @click="showModal = true">
    来吧
  </n-button>
  <n-modal v-model:show="showModal" preset="dialog" title="Dialog">
    <n-card title="卡片" embedded>
      卡片内容
    </n-card>
  </n-modal>
</template>
