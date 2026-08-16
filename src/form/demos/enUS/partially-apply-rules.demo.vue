<markdown>
# Apply partial validation

During validation, use the second parameter of `form.validate` to select rules, field paths, or both. A path is matched exactly against the `path` of a form item.
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
    message: 'Min length is 3'
  },
  fieldB: {
    required: true,
    min: 2,
    message: 'Min length is 2'
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
        Check first field by rule key
      </n-button>
      <n-button @click="validatePartialFields">
        Check second field by path
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
