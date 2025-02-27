<markdown>
# Size

有 small、medium 和 large 尺寸。
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('song1')

const options = ref([
  {
    label: 'Everybody',
    value: 'song0'
  },
  {
    label: 'Drive',
    value: 'song1'
  },
  {
    label: 'Norwegian',
    value: 'song2'
  }
])
</script>

<template>
  <n-space vertical>
    <n-segment v-model:value="value" size="small" :options="options" />
    <n-segment v-model:value="value" size="medium" :options="options" />
    <n-segment v-model:value="value" size="large" :options="options" />
  </n-space>
</template>
