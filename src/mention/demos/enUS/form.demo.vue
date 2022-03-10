<markdown>
# Work with form
</markdown>

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

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { FormInst } from 'naive-ui'

export default defineComponent({
  setup () {
    const formInstRef = ref<FormInst | null>(null)
    const formModelRef = ref({
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
        validator () {
          if (!formModelRef.value.veryCool.includes('@07akioni')) {
            return Error('07akioni should be very cool!')
          }
        }
      }
    }
    return {
      formModel: formModelRef,
      formInstRef,
      rules,
      options: [
        {
          label: '07akioni',
          value: '07akioni'
        },
        {
          label: 'star-kirby',
          value: 'star-kirby'
        }
      ],
      handleButtonClick () {
        formInstRef.value?.validate()
      }
    }
  }
})
</script>
