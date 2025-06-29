<markdown>
# Custom trigger prefix

Use `prefix` to set the trigger character(s).
</markdown>

<script lang="ts" setup>
import type { MentionOption } from 'naive-ui'
import { ref } from 'vue'

const atOptions = [
  {
    label: '07akioni',
    value: '07akioni'
  },
  {
    label: 'star-kirby',
    value: 'star-kirby'
  },
  {
    label: 'Guandong-Road',
    value: 'Guandong-Road'
  },
  {
    label: 'No.5-Yiheyuan-Road',
    value: 'No.5-Yiheyuan-Road'
  }
]

const sharpOptions = [
  {
    label: 'We',
    value: 'We'
  },
  {
    label: 'all',
    value: 'all'
  },
  {
    label: 'live',
    value: 'live'
  },
  {
    label: 'in',
    value: 'in'
  },
  {
    label: 'a',
    value: 'a'
  },
  {
    label: 'yellow',
    value: 'yellow'
  },
  {
    label: 'submarine',
    value: 'submarine'
  }
]

const options = ref<MentionOption[]>([])

function handleSearch(_: string, prefix: string) {
  if (prefix === '@') {
    options.value = atOptions
  }
  else {
    options.value = sharpOptions
  }
}
</script>

<template>
  <n-mention :options="options" :prefix="['@', '#']" @search="handleSearch" />
</template>
