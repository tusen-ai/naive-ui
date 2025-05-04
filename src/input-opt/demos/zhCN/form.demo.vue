<markdown>
# 配合表单使用

配合表单使用实现校验
</markdown>

<script lang="ts" setup>
import { type FormInst, useMessage } from 'naive-ui'
import { ref } from 'vue'

const formRef = ref<FormInst | null>(null)
const message = useMessage()

const formValue = ref({
  passcode: ''
})

const rules = {
  passcode: {
    required: true,
    message: '请输入passcode',
    trigger: ['input']
  }
}

function handleValidateClick(e: MouseEvent) {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      message.success('Valid')
    }
    else {
      console.log(errors)
      message.error('Invalid')
    }
  })
}
</script>

<template>
  <n-form ref="formRef" inline :model="formValue" :rules="rules">
    <n-form-item path="passcode">
      <n-input-opt v-model:value="formValue.passcode" />
    </n-form-item>
    <n-form-item>
      <n-button attr-type="button" @click="handleValidateClick">
        验证
      </n-button>
    </n-form-item>
  </n-form>
</template>
