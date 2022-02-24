<markdown>
# Apply partial rules

During the validation, you may not want to validate all items. You can use the second parameter of `form.validate` to control which rules to be applied.
</markdown>

<template>
  <n-space vertical>
    <n-space>
      <n-button @click="validatePartial">
        Check first field
      </n-button>
      <n-button @click="validateAll">
        Check all fields
      </n-button>
      <n-button @click="clear">
        Restore validation
      </n-button>
    </n-space>
    <n-form ref="formInstRef" :model="model" :rules="rules">
      <n-form-item label="Min length 3" path="fieldA">
        <n-input v-model:value="model.fieldA" />
      </n-form-item>
      <n-form-item label="Min length 2" path="fieldB">
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
          message: 'Min length is 3'
        },
        fieldB: {
          required: true,
          min: 2,
          message: 'Min length is 2'
        }
      }
    }
  }
})
</script>
