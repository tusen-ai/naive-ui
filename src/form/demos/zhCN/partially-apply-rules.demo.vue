<markdown>
# 执行部分校验

在验证过程中，可以使用 `form.validate` 的第二个参数选择要校验的规则、字段路径，或同时选择两者。字段路径与表项的 `path` 精确匹配。
</markdown>

<script lang="ts" setup>
import type { FormInst } from 'naive-ui'
import { ref } from 'vue'

const formInstRef = ref<FormInst | null>(null)
const model = ref({
  fieldA: '',
  fieldB: ''
})

const rules = {
  fieldA: {
    key: 'a',
    required: true,
    min: 3,
    message: '最短长度为 3'
  },
  fieldB: {
    required: true,
    min: 2,
    message: '最短长度为 2'
  }
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

function validatePartialRules() {
  formInstRef.value?.validate(
    (errors) => {
      if (errors) {
        console.error(errors)
      }
    },
    (rule) => {
      return rule?.key === 'a'
    }
  )
}

function validatePartialFields() {
  formInstRef.value?.validate(
    (errors) => {
      if (errors) {
        console.error(errors)
      }
    },
    ['fieldB']
  )
}
</script>

<template>
  <n-space vertical>
    <n-space>
      <n-button @click="validatePartialRules">
        按规则 key 检查第一个字段
      </n-button>
      <n-button @click="validatePartialFields">
        按 path 检查第二个字段
      </n-button>
      <n-button @click="validateAll">
        执行全部规则
      </n-button>
      <n-button @click="clear">
        清空验证
      </n-button>
    </n-space>
    <n-form ref="formInstRef" :model="model" :rules="rules">
      <n-form-item label="最短长度为 3" path="fieldA">
        <n-input v-model:value="model.fieldA" />
      </n-form-item>
      <n-form-item label="最短长度为 2" path="fieldB">
        <n-input v-model:value="model.fieldB" />
      </n-form-item>
    </n-form>
  </n-space>
</template>
