# 表单禁用

```html
<n-space vertical>
  <n-switch v-model:value="updateDisabled" />
  <n-form
    :model="model"
    ref="formRef"
    label-placement="left"
    :label-width="160"
    :disabled="updateDisabled"
    :style="{
      maxWidth: '640px'
    }"
  >
    <n-form-item label="Input" path="inputValue">
      <n-input placeholder="Input" v-model:value="model.inputValue" />
    </n-form-item>
    <n-form-item label="Select" path="selectValue">
      <n-select
        placeholder="Select"
        :options="generalOptions"
        v-model:value="model.selectValue"
      />
    </n-form-item>
    <n-form-item label="Cascader" path="cascaderValue">
      <n-cascader
        :value="model.cascaderValue"
        placeholder="Cascader"
        :options="options"
        :leaf-only="false"
        size="medium"
      />
    </n-form-item>
    <n-form-item label="Datetime" path="datetimeValue">
      <n-date-picker type="datetime" v-model:value="model.datetimeValue" />
    </n-form-item>
    <n-form-item label="Switch" path="switchValue">
      <n-switch v-model:value="model.switchValue" />
    </n-form-item>
    <n-form-item label="Checkbox" path="checkboxValue">
      <n-checkbox v-model:checked="model.checkboxValue">Checkbox</n-checkbox>
    </n-form-item>
    <n-form-item label="Checkbox Group" path="checkboxGroupValue">
      <n-checkbox-group v-model:value="model.checkboxGroupValue">
        <n-space>
          <n-checkbox value="Option 1">Option 1</n-checkbox>
          <n-checkbox value="Option 2">Option 2</n-checkbox>
          <n-checkbox value="Option 3">Option 3</n-checkbox>
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
        <n-radio value="Radio 1">Radio 1</n-radio>
        <n-radio value="Radio 2">Radio 2</n-radio>
        <n-radio value="Radio 3">Radio 3</n-radio>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="Radio Button Group" path="radioGroupValue">
      <n-radio-group v-model:value="model.radioGroupValue" name="radiogroup2">
        <n-radio-button value="Radio 1">Radio 1</n-radio-button>
        <n-radio-button value="Radio 2">Radio 2</n-radio-button>
        <n-radio-button value="Radio 3">Radio 3</n-radio-button>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="Input Number" path="inputNumberValue">
      <n-input-number v-model:value="model.inputNumberValue" />
    </n-form-item>
    <n-form-item label="Time Picker" path="timePickerValue">
      <n-time-picker v-model:value="model.timePickerValue" />
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
    <n-form-item label="Nested Path" :show-feedback="false">
      <n-grid :cols="2" :x-gap="24">
        <n-form-item-gi path="nestedValue.path1">
          <n-input
            placeholder="Nested Path 1"
            v-model:value="model.nestedValue.path1"
          />
        </n-form-item-gi>
        <n-form-item-gi path="nestedValue.path2">
          <n-select
            placeholder="Nested Path 2"
            :options="generalOptions"
            v-model:value="model.nestedValue.path2"
          />
        </n-form-item-gi>
      </n-grid>
    </n-form-item>
  </n-form>
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

function genOptions (depth = 2, iterator = 1, prefix = '') {
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
    return {
      updateDisabled: ref(false),
      formRef,
      model: ref({
        inputValue: null,
        selectValue: null,
        cascaderValue: null,
        datetimeValue: null,
        nestedValue: {
          path1: null,
          path2: null
        },
        switchValue: false,
        checkboxValue: null,
        checkboxGroupValue: null,
        radioValue: 'Definitely Maybe',
        radioGroupValue: null,
        radioButtonGroupValue: null,
        inputNumberValue: null,
        timePickerValue: null,
        sliderValue: 0,
        transferValue: null
      }),
      generalOptions: ['groode', 'veli good', 'emazing', 'lidiculous'].map(
        (v) => ({
          label: v,
          value: v
        })
      ),
      options: genOptions()
    }
  }
})
```
