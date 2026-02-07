<markdown>
# Validate specific fields

Use `form.validateFields` to validate specific form items by their field paths, without adding `key` to every `rule`.
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
    message: 'Please input name',
    trigger: 'input'
  },
  age: {
    required: true,
    message: 'Please input age',
    trigger: 'input'
  },
  phone: [
    { required: true, message: 'Please input phone number', trigger: 'input' },
    {
      pattern: /^\d+$/,
      message: 'Phone number must be digits',
      trigger: 'input'
    }
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
        Validate name
      </n-button>
      <n-button @click="validateNameAndPhone">
        Validate name & phone
      </n-button>
      <n-button @click="validateAll">
        Validate all
      </n-button>
      <n-button @click="clear">
        Restore validation
      </n-button>
    </n-space>
    <n-form ref="formInstRef" :model="model" :rules="rules">
      <n-form-item label="Name" path="name">
        <n-input v-model:value="model.name" />
      </n-form-item>
      <n-form-item label="Age" path="age">
        <n-input v-model:value="model.age" />
      </n-form-item>
      <n-form-item label="Phone" path="phone">
        <n-input v-model:value="model.phone" />
      </n-form-item>
    </n-form>
  </n-space>
</template>
