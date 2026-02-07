<markdown>
# 校验指定字段

使用 `form.validateFields` 可以直接通过字段路径校验指定的表单项，不需要在 `rule` 上添加 `key`。
</markdown>

<script lang="ts" setup>
import type { FormInst } from 'naive-ui'
import { ref } from 'vue'

const formInstRef = ref<FormInst | null>(null)
const model = ref({
  name: '',
  age: '',
  phone: ''
})

const rules = {
  name: {
    required: true,
    message: '请输入姓名',
    trigger: 'input'
  },
  age: {
    required: true,
    message: '请输入年龄',
    trigger: 'input'
  },
  phone: [
    { required: true, message: '请输入电话号码', trigger: 'input' },
    { pattern: /^\d+$/, message: '电话号码必须为数字', trigger: 'input' }
  ]
}

function clear() {
  formInstRef.value?.restoreValidation()
}

function validateAll() {
  formInstRef.value?.validate((errors) => {
    if (errors) {
      console.error(errors)
    }
  })
}

function validateName() {
  formInstRef.value?.validateFields('name', (errors) => {
    if (errors) {
      console.error(errors)
    }
  })
}

function validateNameAndPhone() {
  formInstRef.value?.validateFields(['name', 'phone'], (errors) => {
    if (errors) {
      console.error(errors)
    }
  })
}
</script>

<template>
  <n-space vertical>
    <n-space>
      <n-button @click="validateName">
        校验姓名
      </n-button>
      <n-button @click="validateNameAndPhone">
        校验姓名和电话号码
      </n-button>
      <n-button @click="validateAll">
        校验全部
      </n-button>
      <n-button @click="clear">
        清空验证
      </n-button>
    </n-space>
    <n-form ref="formInstRef" :model="model" :rules="rules">
      <n-form-item label="姓名" path="name">
        <n-input v-model:value="model.name" />
      </n-form-item>
      <n-form-item label="年龄" path="age">
        <n-input v-model:value="model.age" />
      </n-form-item>
      <n-form-item label="电话号码" path="phone">
        <n-input v-model:value="model.phone" />
      </n-form-item>
    </n-form>
  </n-space>
</template>
