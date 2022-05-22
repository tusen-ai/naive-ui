<markdown>
# Dynamic form

Delete or add form items dynamically.
</markdown>

<template>
  <n-form ref="formRef" :model="dynamicForm" :style="{ maxWidth: '640px' }">
    <n-form-item
      label="name"
      path="name"
      :rule="{
        required: true,
        message: 'Please input Name',
        trigger: ['input', 'blur']
      }"
    >
      <n-input v-model:value="dynamicForm.name" clearable />
    </n-form-item>

    <n-form-item
      v-for="(item, index) in dynamicForm.hobbies"
      :key="index"
      :label="`hobby${index + 1}`"
      :path="`hobbies[${index}].hobby`"
      :rule="{
        required: true,
        message: `Please input hobby${index + 1}`,
        trigger: ['input', 'blur']
      }"
    >
      <n-input v-model:value="item.hobby" clearable />
      <n-button style="margin-left: 12px" @click="removeItem(index)">
        Remove
      </n-button>
    </n-form-item>

    <n-form-item>
      <n-space>
        <n-button attr-type="button" @click="handleValidateClick">
          Validate
        </n-button>
        <n-button attr-type="button" @click="addItem">
          New hobby
        </n-button>
      </n-space>
    </n-form-item>
  </n-form>
</template>

<script lang="ts">
import { FormInst } from 'naive-ui'
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  setup () {
    const formRef = ref<FormInst | null>(null)

    const dynamicForm = reactive({
      name: '',
      hobbies: [{ hobby: '' }]
    })

    const removeItem = (index: number) => {
      dynamicForm.hobbies.splice(index, 1)
    }

    const addItem = () => {
      dynamicForm.hobbies.push({ hobby: '' })
    }

    const handleValidateClick = () => {
      formRef.value?.validate((errors) => {
        if (!errors) {
          console.log('success')
        } else {
          console.log(errors)
        }
      })
    }

    return {
      formRef,
      dynamicForm,
      addItem,
      removeItem,
      handleValidateClick
    }
  }
})
</script>
