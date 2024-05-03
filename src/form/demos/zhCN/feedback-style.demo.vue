<markdown>
# 自定义反馈样式

使用 `feedback-style` 和 `feedback-class` 可以自定义反馈信息的样式。
</markdown>

<template>
  <n-form :model="formValue">
    <n-form-item
      :rule="{
        required: true,
        message: '居中的 feedback',
        type: 'string',
        trigger: ['input', 'blur']
      }"
      label="Feedback 居中"
      path="input"
      feedback-style="text-align: center;"
    >
      <n-input v-model:value="formValue.input" />
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

type FormValue = {
  input: string | null
}

const formValue: FormValue = reactive({
  input: null
})
</script>
