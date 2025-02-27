<markdown>
# Block

Set `block` to `true` to fit the width of parent element.
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const options = ref([
  {
    label: '爱来自东元前',
    value: 'east'
  },
  {
    label: '爱来自西元前',
    value: 'west'
  },
  {
    label: '爱来自南元前',
    value: 'south'
  },
  {
    label: '爱来自北元前',
    value: 'north'
  }
])
</script>

<template>
  <n-segment default-value="west" :options="options" block />
</template>
