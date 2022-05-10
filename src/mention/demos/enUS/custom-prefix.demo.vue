<markdown>
# Custom trigger prefix

Use `prefix` to set the trigger character(s).
</markdown>

<template>
  <n-mention :options="options" :prefix="['@', '#']" @search="handleSearch" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { MentionOption } from 'naive-ui'

export default defineComponent({
  setup () {
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
    const optionsRef = ref<MentionOption[]>([])
    return {
      options: optionsRef,
      handleSearch (_: string, prefix: string) {
        if (prefix === '@') {
          optionsRef.value = atOptions
        } else {
          optionsRef.value = sharpOptions
        }
      }
    }
  }
})
</script>
