<markdown>
# Fallback option

If you don't need fallback options, setting `fallback-option` to `false` ensures that only an option with a matching value will be displayed. If no option has that value, the selected value will be cleared.
</markdown>

<template>
  <n-space vertical>
    <n-select v-model:value="singleValue" :options="options" />
    <n-select
      v-model:value="multipleValue"
      multiple
      :fallback-option="trim"
      :options="options"
    />
    <n-select
      v-model:value="singleValue"
      placeholder="No Fallback"
      :fallback-option="false"
      :options="options"
    />
    <n-select
      v-model:value="multipleValue"
      placeholder="No Fallback"
      multiple
      :fallback-option="false"
      :options="options"
    />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { SelectOption } from 'naive-ui'

export default defineComponent({
  setup () {
    return {
      trim: (value: string): SelectOption => {
        return {
          label: value.split(' ')[0],
          value
        }
      },
      singleValue: ref('A Nowhere Value'),
      multipleValue: ref(['First Nowhere Value', 'Second Nowhere Value']),
      options: [
        {
          label: "Everybody's Got Something to Hide Except Me and My Monkey",
          value: 'song0',
          disabled: true
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
          label: "You Won't See",
          value: 'song3',
          disabled: true
        },
        {
          label: 'Nowhere Man',
          value: 'song4'
        },
        {
          label: 'Think For Yourself',
          value: 'song5'
        },
        {
          label: 'The Word',
          value: 'song6'
        },
        {
          label: 'Michelle',
          value: 'song7',
          disabled: true
        },
        {
          label: 'What goes on',
          value: 'song8'
        },
        {
          label: 'Girl',
          value: 'song9'
        },
        {
          label: "I'm looking through you",
          value: 'song10'
        },
        {
          label: 'In My Life',
          value: 'song11'
        },
        {
          label: 'Wait',
          value: 'song12'
        }
      ]
    }
  }
})
</script>
