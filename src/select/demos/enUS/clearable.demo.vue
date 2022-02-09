<markdown>
# Clearable

Make the select clearable. Remember you can only clear a select that has a value.
</markdown>

<template>
  <n-space vertical>
    <n-select v-model:value="selectedValue" :options="options" clearable />
    <n-select
      v-model:value="selectedArray"
      multiple
      :options="options"
      clearable
    />
    <n-select
      v-model:value="selectedValue"
      :options="options"
      filterable
      clearable
    />
    <n-select
      v-model:value="selectedArray"
      multiple
      :options="options"
      filterable
      clearable
    />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      selectedValue: ref(null),
      selectedArray: ref([]),
      options: [
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
          value: 'song3'
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
          value: 'song7'
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
