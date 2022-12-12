<markdown>
# Custom parsing

You can use `parse` and `format` to custom parsing & display. For example add thousand separator. Usually they should be set together, especially you have a custom `validator` set.

Use `parse` and `format` will disable `update-value-on-input`.
</markdown>

<template>
  <n-space vertical>
    <n-input-number :default-value="1075" :parse="parse" :format="format" />
    <n-input-number
      :default-value="1075"
      :parse="parseCurrency"
      :format="formatCurrency"
    />
  </n-space>
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
      },
      parseCurrency: (input: string) => {
        const nums = input.replace(/(,|\$|\s)/g, '').trim()
        if (/^\d+(\.(\d+)?)?$/.test(nums)) return Number(nums)
        return nums === '' ? null : Number.NaN
      },
      formatCurrency: (value: number | null) => {
        if (value === null) return ''
        return `${value.toLocaleString('en-US')} \u{24}`
      }
    }
  }
})
</script>
