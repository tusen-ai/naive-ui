<markdown>
# Custom validation

If you need to customize the timing and effect of a validation, use `validation-status` and `feedback`. In this case, there's usually no need for providing a `path` for the form item.
</markdown>

<template>
  <n-form>
    <n-form-item
      label="Airports"
      :validation-status="inputValidationStatus"
      :feedback="inputFeedback"
    >
      <n-input v-model:value="inputValue" clearable />
    </n-form-item>
    <n-form-item
      label="Airports"
      :validation-status="inputNumberValidationStatus"
    >
      <n-input-number v-model:value="inputNumberValue" />
      <template #feedback>
        {{ inputNumberFeedback }}
      </template>
    </n-form-item>
    <n-form-item
      label="Airports"
      :validation-status="selectValidationStatus"
      :feedback="selectFeedback"
    >
      <n-select
        v-model:value="selectValue"
        debug
        :options="selectOptions"
        clearable
      />
    </n-form-item>
  </n-form>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

function createStatus (value: string) {
  switch (value) {
    case '10:30':
      return undefined
    case '10:29':
      return 'warning'
    default:
      return 'error'
  }
}

function createFeedback (value: string) {
  switch (value) {
    case '10:30':
      return 'The plane of 10:30 has arrived.'
    case '10:29':
      return 'Almost there, please set the time to 10:30'
    default:
      return 'Please set the time to 10:30'
  }
}

function createTimeForNumber (num: number) {
  return `${parseInt(String(num / 100), 10)}:${num % 100}`
}

export default defineComponent({
  setup () {
    const inputValueRef = ref('10:29')
    const inputNumberValueRef = ref(1029)
    const selectValueRef = ref('10:29')

    return {
      inputValue: inputValueRef,
      inputNumberValue: inputNumberValueRef,
      selectValue: selectValueRef,
      selectOptions: [
        {
          label: '10:28',
          value: '10:28'
        },
        {
          label: '10:29',
          value: '10:29'
        },
        {
          label: '10:30',
          value: '10:30'
        }
      ],
      inputValidationStatus: computed(() => {
        return createStatus(inputValueRef.value)
      }),
      inputFeedback: computed(() => {
        return createFeedback(inputValueRef.value)
      }),
      inputNumberValidationStatus: computed(() => {
        return createStatus(createTimeForNumber(inputNumberValueRef.value))
      }),
      inputNumberFeedback: computed(() => {
        return createFeedback(createTimeForNumber(inputNumberValueRef.value))
      }),
      selectValidationStatus: computed(() => {
        return createStatus(selectValueRef.value)
      }),
      selectFeedback: computed(() => {
        return createFeedback(selectValueRef.value)
      })
    }
  }
})
</script>
