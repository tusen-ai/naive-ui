<markdown>
# 自定义解析

你可以使用 `parse` 和 `format` 来自定义解析和展示内容，例如增加千位分隔符。通常这两个要一起设定，尤其是当你使用了自定义的 `validator` 时。

使用 `parse` 和 `format` 会使 `update-value-on-input` 失效。
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
        const nums = input.replace(/(,|¥|\s)/g, '').trim()
        if (/^\d+(\.(\d+)?)?$/.test(nums)) return Number(nums)
        return nums === '' ? null : Number.NaN
      },
      formatCurrency: (value: number | null) => {
        if (value === null) return ''
        return `${value.toLocaleString('en-US')} ¥`
      }
    }
  }
})
</script>
