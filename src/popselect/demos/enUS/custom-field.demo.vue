<markdown>
# Custom Field

Backend would send all kinds of data.
</markdown>

<script lang="ts" setup>
import type { SelectGroupOption, SelectOption } from 'naive-ui'
import { ref } from 'vue'

const value = ref<string | null>('song1')

const options: Array<SelectGroupOption | SelectOption> = [
  {
    type: 'group',
    customLabel: 'Rubber Soul',
    key: 'Rubber Soul',
    customChildren: [
      {
        customLabel: 'Drive My Car',
        customValue: 'song1'
      },
      {
        customLabel: 'Norwegian Wood',
        customValue: 'song2'
      },
      {
        customLabel: 'You Won\'t See',
        customValue: 'song3',
        disabled: true
      },
      {
        customLabel: 'Nowhere Man',
        customValue: 'song4'
      },
      {
        customLabel: 'Think For Yourself',
        customValue: 'song5'
      },
      {
        customLabel: 'The Word',
        customValue: 'song6'
      }
    ]
  },
  {
    type: 'group',
    customLabel: 'Let It Be',
    key: 'Let It Be Album',
    customChildren: [
      {
        customLabel: 'Two Of Us',
        customValue: 'Two Of Us'
      },
      {
        customLabel: 'Dig A Pony',
        customValue: 'Dig A Pony'
      },
      {
        customLabel: 'Across The Universe',
        customValue: 'Across The Universe'
      },
      {
        customLabel: 'Let It Be',
        customValue: 'Let It Be'
      },
      {
        customLabel: 'Get Back',
        customValue: 'Get Back'
      }
    ]
  }
]

function getLabel(val: string | null): string {
  if (!val)
    return 'Popselect'
  for (const group of options) {
    if ('customChildren' in group) {
      const found = group.customChildren?.find(
        (item: any) => item.customValue === val
      )
      if (found)
        return found.customLabel
    }
  }
  return 'Popselect'
}
</script>

<template>
  <n-popselect
    v-model:value="value"
    :options="options"
    label-field="customLabel"
    value-field="customValue"
    children-field="customChildren"
    scrollable
    trigger="click"
  >
    <n-button>{{ getLabel(value) }}</n-button>
  </n-popselect>
</template>
