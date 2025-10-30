<markdown>
# Keep alive debug
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const showTable = ref(false)
</script>

<template>
  <n-button @click="showTable = !showTable">
    showTable: {{ showTable }}
  </n-button>
  <!-- 不虚拟
  <keep-alive>
    <component :is="showTable ? 'component-a' : 'n-empty'" />
  </keep-alive> -->
  虚拟
  <keep-alive>
    <component :is="showTable ? 'component-b' : 'n-empty'" />
  </keep-alive>
</template>
