<markdown>
# Custom parsing

You can use `parse` and `format` to custom parsing & display. For example add thousand separator. Usually they should be set together.

Use `parse` and `format` will disable `update-value-on-input`.
</markdown>

<template>
  <n-input-number :default-value="1075" :parse="parse" :format="format" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      parse: (input: string) => {
        const nums = input.replace(/,/g, '').trim()
        if (/^\d+(\.(\d+)?)?$/.test(nums)) return Number(nums)
        return nums === '' ? null : Number.NaN
      },
      format: (value: number | null) => {
        if (value === null) return ''
        return value.toLocaleString('en-US')
      }
    }
  }
})
</script>
