<markdown>
# Select
</markdown>

<script setup lang="ts">
import { ref } from 'vue'

const showModal = ref(false)
const model = ref({
  selectValue: null,
  multipleSelectValue: null,
  datetimeValue: Date.now(),
  timePickerValue: Date.now()
})

const generalOptions = ['groode', 'veli good', 'emazing', 'lidiculous'].map(
  v => ({
    label: v,
    value: v
  })
)
</script>

<template>
  <n-button @click="showModal = true">
    来吧
  </n-button>
  <n-modal
    v-model:show="showModal"
    preset="card"
    style="width: 600px"
    title="表单测试"
  >
    <n-form
      :model="model"
      label-placement="left"
      label-width="auto"
      :style="{
        maxWidth: '540px',
      }"
    >
      <n-form-item label="Select" path="selectValue">
        <n-select
          v-model:value="model.selectValue"
          placeholder="Select"
          :options="generalOptions"
        />
      </n-form-item>
      <n-form-item label="Multiple Select" path="multipleSelectValue">
        <n-select
          v-model:value="model.multipleSelectValue"
          placeholder="Select"
          :options="generalOptions"
          multiple
        />
      </n-form-item>
      <n-form-item label="Datetime" path="datetimeValue">
        <n-date-picker v-model:value="model.datetimeValue" type="datetime" />
      </n-form-item>
      <n-form-item label="Time Picker" path="timePickerValue">
        <n-time-picker v-model:value="model.timePickerValue" />
      </n-form-item>
    </n-form>
  </n-modal>
</template>
