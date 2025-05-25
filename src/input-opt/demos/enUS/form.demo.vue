<markdown>
# Use with the form

Use with forms to achieve validation
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
    message: 'error passcode',
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
        validate
      </n-button>
    </n-form-item>
  </n-form>
</template>
