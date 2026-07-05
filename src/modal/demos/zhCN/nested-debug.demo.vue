<markdown>
# Nested debug
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const show1 = ref(false)
const show2 = ref(false)
</script>

<template>
  <n-button @click="show1 = !show1">
    show1
  </n-button>
  <n-modal v-model:show="show1" preset="card" style="width: 600px">
    <n-button @click="show2 = !show2">
      show1
    </n-button>
    <n-modal v-model:show="show2" preset="card" style="width: 600px">
      <n-select :options="[{ value: '1', label: '1' }]" />
    </n-modal>
  </n-modal>
</template>
