<markdown>
# 配合表单
</markdown>

<script lang="ts" setup>
import type { FormInst } from 'naive-ui'
import { ref } from 'vue'

const formInstRef = ref<FormInst | null>(null)
const formModel = ref({
  cool: '',
  veryCool: ''
})

const rules = {
  cool: {
    trigger: ['input', 'blur'],
    required: true,
    message: 'Cool is required'
  },
  veryCool: {
    trigger: ['input', 'blur'],
    validator() {
      if (!formModel.value.veryCool.includes('@07akioni')) {
        return new Error('07akioni should be very cool!')
      }
    }
  }
}

const options = [
  {
    label: '07akioni',
    value: '07akioni'
  },
  {
    label: 'star-kirby',
    value: 'star-kirby'
  }
]

function handleButtonClick() {
  formInstRef.value?.validate()
}
</script>

<template>
  <n-space vertical>
    <n-form ref="formInstRef" :model="formModel" :rules="rules">
      <n-form-item label="Cool" path="cool">
        <n-mention v-model:value="formModel.cool" :options="options" />
      </n-form-item>
      <n-form-item label="Very Cool" path="veryCool">
        <n-mention
          v-model:value="formModel.veryCool"
          type="textarea"
          :options="options"
        />
      </n-form-item>
    </n-form>
    <n-button @click="handleButtonClick">
      Validate
    </n-button>
  </n-space>
</template>
