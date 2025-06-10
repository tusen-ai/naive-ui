<markdown>
# Vertical
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const options = ref([
  {
    value: 'Rock\'n\'Roll Star',
    label: 'Rock\'n\'Roll Star'
  },
  {
    value: 'Shakermaker',
    label: 'Shakermaker'
  },
  {
    value: 'Live Forever',
    label: 'Live Forever'
  },
  {
    value: 'Up in the Sky',
    label: 'Up in the Sky'
  },
  {
    value: '...',
    label: '...'
  }
])
</script>

<template>
  <n-segment vertical default-value="Shakermaker" :options="options" />
</template>
