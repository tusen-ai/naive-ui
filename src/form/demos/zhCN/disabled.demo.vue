<markdown>
# 表单禁用
</markdown>

<template>
  <n-space vertical>
    <n-switch v-model:value="updateDisabled" />
    <n-form
      ref="formRef"
      :model="model"
      label-placement="left"
      :label-width="160"
      :disabled="updateDisabled"
      :style="{
        maxWidth: '640px'
      }"
    >
      <n-form-item label="Input" path="inputValue">
        <n-input v-model:value="model.inputValue" placeholder="Input" />
      </n-form-item>
      <n-form-item label="Select" path="selectValue">
        <n-select
          v-model:value="model.selectValue"
          placeholder="Select"
          :options="generalOptions"
        />
      </n-form-item>
      <n-form-item label="Upload" path="uploadValue">
        <n-upload>
          <n-button>Upload file</n-button>
        </n-upload>
      </n-form-item>
      <n-form-item label="Auto Complete" path="autoCompleteValue">
        <n-auto-complete
          v-model:value="model.autoCompleteValue"
          :options="autoCompleteOptions"
          placeholder="Email"
        />
      </n-form-item>
      <n-form-item label="Dynamic Tags" path="dynamicTagsValue">
        <n-dynamic-tags v-model:value="model.dynamicTagsValue" />
      </n-form-item>
      <n-form-item label="Tree Select" path="treeSelectValue">
        <n-tree-select
          :options="treeSelectOptions"
          default-value="Drive My Car"
        />
      </n-form-item>
      <n-form-item label="Cascader" path="cascaderValue">
        <n-cascader
          v-model:value="model.cascaderValue"
          placeholder="Cascader"
          :options="options"
          check-strategy="child"
          size="medium"
        />
      </n-form-item>
      <n-form-item label="Datetime" path="datetimeValue">
        <n-date-picker v-model:value="model.datetimeValue" type="datetime" />
      </n-form-item>
      <n-form-item label="Switch" path="switchValue">
        <n-switch v-model:value="model.switchValue" />
      </n-form-item>
      <n-form-item label="Checkbox" path="checkboxValue">
        <n-checkbox v-model:checked="model.checkboxValue">
          Checkbox
        </n-checkbox>
      </n-form-item>
      <n-form-item label="Checkbox Group" path="checkboxGroupValue">
        <n-checkbox-group v-model:value="model.checkboxGroupValue">
          <n-space>
            <n-checkbox value="Option 1">
              Option 1
            </n-checkbox>
            <n-checkbox value="Option 2">
              Option 2
            </n-checkbox>
            <n-checkbox value="Option 3">
              Option 3
            </n-checkbox>
          </n-space>
        </n-checkbox-group>
      </n-form-item>
      <n-form-item label="Radio" path="radioValue">
        <n-radio
          :checked="model.radioValue === 'Definitely Maybe'"
          value="Definitely Maybe"
          name="basic-demo"
        >
          Definitely Maybe
        </n-radio>
      </n-form-item>
      <n-form-item label="Radio Group" path="radioGroupValue">
        <n-radio-group v-model:value="model.radioGroupValue" name="radiogroup2">
          <n-radio value="Radio 1">
            Radio 1
          </n-radio>
          <n-radio value="Radio 2">
            Radio 2
          </n-radio>
          <n-radio value="Radio 3">
            Radio 3
          </n-radio>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="Radio Button Group" path="radioGroupValue">
        <n-radio-group v-model:value="model.radioGroupValue" name="radiogroup2">
          <n-radio-button value="Radio 1">
            Radio 1
          </n-radio-button>
          <n-radio-button value="Radio 2">
            Radio 2
          </n-radio-button>
          <n-radio-button value="Radio 3">
            Radio 3
          </n-radio-button>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="Input Number" path="inputNumberValue">
        <n-input-number v-model:value="model.inputNumberValue" />
      </n-form-item>
      <n-form-item label="Time Picker" path="timePickerValue">
        <n-time-picker v-model:value="model.timePickerValue" />
      </n-form-item>
      <n-form-item label="Color Picker" path="colorValue">
        <n-color-picker v-model:value="model.colorValue" />
      </n-form-item>
      <n-form-item label="Slider" path="sliderValue">
        <n-slider v-model:value="model.sliderValue" :step="5" />
      </n-form-item>
      <n-form-item label="Transfer" path="transferValue">
        <n-transfer
          v-model:value="model.transferValue"
          :options="generalOptions"
        />
      </n-form-item>
    </n-form>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function genOptions (depth = 2, iterator = 1, prefix = ''): any {
  const length = 12
  const options = []
  for (let i = 1; i <= length; ++i) {
    if (iterator === 1) {
      options.push({
        value: `${i}`,
        label: `${i}`,
        disabled: i % 5 === 0,
        children: genOptions(depth, iterator + 1, '' + i)
      })
    } else if (iterator === depth) {
      options.push({
        value: `${prefix}-${i}`,
        label: `${prefix}-${i}`,
        disabled: i % 5 === 0
      })
    } else {
      options.push({
        value: `${prefix}-${i}`,
        label: `${prefix}-${i}`,
        disabled: i % 5 === 0,
        children: genOptions(depth, iterator + 1, `${prefix}-${i}`)
      })
    }
  }
  return options
}
export default defineComponent({
  setup () {
    const formRef = ref(null)
    const model = ref({
      inputValue: null,
      selectValue: null,
      autoCompleteValue: '',
      dynamicTagsValue: ['teacher', 'frontend'],
      cascaderValue: null,
      datetimeValue: null,
      switchValue: false,
      checkboxValue: false,
      checkboxGroupValue: null,
      radioValue: 'Definitely Maybe',
      radioGroupValue: null,
      radioButtonGroupValue: null,
      inputNumberValue: null,
      timePickerValue: null,
      colorValue: null,
      sliderValue: 0,
      transferValue: null
    })
    return {
      updateDisabled: ref(false),
      formRef,
      model,
      generalOptions: ['groode', 'veli good', 'emazing', 'lidiculous'].map(
        (v) => ({
          label: v,
          value: v
        })
      ),
      options: genOptions(),
      treeSelectOptions: [
        {
          label: 'Rubber Soul',
          key: 'Rubber Soul',
          children: [
            {
              label: 'Drive My Car',
              key: 'Drive My Car'
            },
            {
              label: 'Michelle',
              key: 'Michelle'
            }
          ]
        }
      ],
      autoCompleteOptions: computed(() => {
        return ['@gmail.com', '@163.com', '@qq.com'].map((suffix) => {
          const prefix = model.value.autoCompleteValue.split('@')[0]
          return {
            label: prefix + suffix,
            value: prefix + suffix
          }
        })
      })
    }
  }
})
</script>
