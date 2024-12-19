<markdown>
# Options Change Debug
</markdown>

<script lang="ts">
import type { SelectOption } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value = ref(null)
    const options = ref<SelectOption[]>([
      {
        label: 'Everybody\'s Got Something to Hide Except Me and My Monkey',
        value: 'song0'
      },
      {
        label: 'Drive My Car',
        value: 'song1'
      },
      {
        label: 'Norwegian Wood',
        value: 'song2'
      },
      {
        label: 'You Won\'t See',
        value: 'song3'
      }
    ])
    const handleClick = () => {
      options.value = [
        {
          label: 'Everybody\'s Got Something to Hide Except Me and My Monkey',
          value: 'song0'
        },
        {
          label: 'Drive My Car',
          value: 'song1',
          disabled: true
        },
        {
          label: 'Norwegian Wood',
          value: 'song2',
          disabled: true
        },
        {
          label: 'You Won\'t See',
          value: 'song3'
        }
      ]
    }
    return {
      value,
      options,
      handleClick
    }
  }
})
</script>

<template>
  <n-space vertical>
    <n-button @click="handleClick">
      reset
    </n-button>
    <n-select v-model:value="value" multiple :options="options" />
  </n-space>
</template>
