<markdown>
# 配合表单使用

配合表单使用实现校验。
</markdown>

<script lang="ts" setup>
import type { FormInst, FormRules } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { ref } from 'vue'

const formRef = ref<FormInst | null>(null)
const message = useMessage()

const formValue = ref({
  passcode: null
})

const rules: FormRules = {
  passcode: [
    {
      message: '请输入验证码',
      validator: (_, value: string[] | null) => {
        if (value === null)
          return false
        return value.filter(Boolean).length >= 6
      },
      trigger: ['blur']
    },
    {
      message: '请输入验证码',
      validator: (_, value: string[] | null) => {
        if (value === null)
          return false
        return value.filter(Boolean).length >= 1
      },
      trigger: ['input']
    }
  ]
}

function handleValidateClick(e: MouseEvent) {
  e.preventDefault()
  formRef.value?.validate(
    (errors) => {
      if (!errors) {
        message.success('验证成功')
      }
      else {
        console.log(errors)
        message.error('验证失败')
      }
    },
    rule => !!rule.trigger?.includes('blur')
  )
}
</script>

<template>
  <n-form ref="formRef" inline :model="formValue" :rules="rules">
    <n-form-item path="passcode" label="验证码">
      <n-input-otp v-model:value="formValue.passcode" />
    </n-form-item>
    <n-form-item>
      <n-button attr-type="button" @click="handleValidateClick">
        验证
      </n-button>
    </n-form-item>
  </n-form>
</template>
