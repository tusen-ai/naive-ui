<markdown>
# 只执行部分规则

在验证的过程中，你可能并不总想验证全部的表单项，你可以使用 `form.validate` 的第二个参数控制应用的规则。
</markdown>

<template>
  <n-space vertical>
    <n-space>
      <n-button @click="validatePartial">
        检查第一个字段
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

<script lang="ts">
import { FormInst } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const formInstRef = ref<FormInst | null>(null)
    return {
      clear () {
        formInstRef.value?.restoreValidation()
      },
      validateAll () {
        formInstRef.value?.validate((errors) => {
          if (errors) {
            console.error(errors)
          }
        })
      },
      validatePartial () {
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
      },
      formInstRef,
      model: ref({
        fieldA: '',
        fieldB: ''
      }),
      rules: {
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
    }
  }
})
</script>
