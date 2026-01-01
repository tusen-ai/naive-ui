<markdown>
# Multiple

Select multiple value in popselect.
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const values = ref([])
const options = [
  {
    label: 'Drive My Car',
    value: 'Drive My Car'
  },
  {
    label: 'Norwegian Wood',
    value: 'Norwegian Wood'
  },
  {
    label: 'You Won\'t See',
    value: 'You Won\'t See'
  },
  {
    label: 'Nowhere Man',
    value: 'Nowhere Man'
  },
  {
    label: 'Think For Yourself',
    value: 'Think For Yourself'
  },
  {
    label: 'The Word',
    value: 'The Word'
  }
]
</script>

<template>
  <n-popselect v-model:value="values" multiple :options="options">
    <n-button>{{ values.join(', ') || 'Popselect' }}</n-button>
  </n-popselect>
</template>
