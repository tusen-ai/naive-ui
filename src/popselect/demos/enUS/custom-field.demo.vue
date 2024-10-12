<markdown>
# Customizing field

Various data would come from backend.
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      value: ref('Drive My Car'),
      options: [
        {
          whateverLabel: 'Drive My Car',
          whateverValue: 'Drive My Car'
        },
        {
          whateverLabel: 'Norwegian Wood',
          whateverValue: 'Norwegian Wood'
        },
        {
          whateverLabel: 'You Won\'t See',
          whateverValue: 'You Won\'t See',
          disabled: true
        },
        {
          whateverLabel: 'Nowhere Man',
          whateverValue: 'Nowhere Man'
        },
        {
          whateverLabel: 'Think For Yourself',
          whateverValue: 'Think For Yourself'
        },
        {
          whateverLabel: 'The Word',
          whateverValue: 'The Word'
        },
        {
          whateverLabel: 'Michelle',
          whateverValue: 'Michelle',
          disabled: true
        },
        {
          whateverLabel: 'What goes on',
          whateverValue: 'What goes on'
        },
        {
          whateverLabel: 'Girl',
          whateverValue: 'Girl'
        },
        {
          whateverLabel: 'I\'m looking through you',
          whateverValue: 'I\'m looking through you'
        },
        {
          whateverLabel: 'In My Life',
          whateverValue: 'In My Life'
        },
        {
          whateverLabel: 'Wait',
          whateverValue: 'Wait'
        }
      ]
    }
  }
})
</script>

<template>
  <n-popselect
    v-model:value="value"
    label-field="whateverLabel"
    value-field="whateverValue"
    :options="options"
    trigger="click"
  >
    <n-button>{{ value || '弹出选择' }}</n-button>
  </n-popselect>
</template>
