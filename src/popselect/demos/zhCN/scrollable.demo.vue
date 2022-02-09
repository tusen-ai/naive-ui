<markdown>
# 让它滚动

</markdown>

<template>
  <n-popselect
    v-model:value="value"
    :options="options"
    size="medium"
    scrollable
  >
    <n-button style="margin-right: 8px">
      {{ value || 'Popselect' }}
    </n-button>
  </n-popselect>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref('Drive My Car'),
      options: [
        {
          label: 'Drive My Car',
          value: 'Drive My Car'
        },
        {
          label: 'Norwegian Wood',
          value: 'Norwegian Wood'
        },
        {
          label: "You Won't See",
          value: "You Won't See",
          disabled: true
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
        },
        {
          label: 'Michelle',
          value: 'Michelle',
          disabled: true
        },
        {
          label: 'What goes on',
          value: 'What goes on'
        },
        {
          label: 'Girl',
          value: 'Girl'
        },
        {
          label: "I'm looking through you",
          value: "I'm looking through you"
        },
        {
          label: 'In My Life',
          value: 'In My Life'
        },
        {
          label: 'Wait',
          value: 'Wait'
        }
      ]
    }
  }
})
</script>
