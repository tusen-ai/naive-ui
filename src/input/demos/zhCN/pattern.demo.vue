<markdown>
# 输入校验

限制输入框的输入格式。
</markdown>

<template>
  <n-space vertical>
    <n-input
      type="text"
      :pattern="validateOnlyNumber"
      placeholder="只能输入数字"
    />
    <n-input
      type="textarea"
      :pattern="validateEmpty"
      placeholder="不能输入空格"
    />
  </n-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      validateOnlyNumber: (value: string) => !value || /^\d+$/.test(value),
      validateEmpty: (value: string) => !/ /g.test(value)
    }
  }
})
</script>
