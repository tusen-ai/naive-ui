<markdown>
# A11y debug
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(false)

function handleClick() {
  active.value = !active.value
}
</script>

<template>
  <n-button @click="handleClick">
    Trigger
  </n-button>
  <n-drawer v-model:show="active" :width="502">
    <n-input />
    <n-input />
    <n-input />
  </n-drawer>
</template>
