# Horiziontal
```html
<n-form
  :model="model"
  ref="form"
  label-placement="left"
  label-align="right"
  :label-width="160"
  :style="{
    maxWidth: '640px'
  }"
>
  <n-form-item-row label="Input" path="inputValue" required>
    <n-input placeholder="Input" v-model="model.inputValue" />
  </n-form-item-row>
  <n-form-item-row label="Textarea" path="textareaValue" required>
    <n-input placeholder="Textarea" v-model="model.textareaValue" type="textarea"
      :autosize="{
        minRows: 3,
        maxRows: 5
      }"
    />
  </n-form-item-row>
  <n-form-item-row label="Select" path="selectValue" required>
    <n-select placeholder="Select" :options="generalOptions" v-model="model.selectValue"/>
  </n-form-item-row>
  <n-form-item-row label="Multiple Select" path="multipleSelectValue" required>
    <n-select placeholder="Select" :options="generalOptions" v-model="model.multipleSelectValue" multiple/>
  </n-form-item-row>
  <n-form-item-row label="Datetime" path="datetimeValue" required>
    <n-date-picker type="datetime" v-model="model.datetimeValue"/>
  </n-form-item-row>
  <n-form-item-row label="Switch" path="switchValue" required>
    <n-switch v-model="model.switchValue" />
  </n-form-item-row>
  <n-form-item-row label="Checkbox Group" path="checkboxGroupValue" required>
    <n-checkbox-group v-model="model.checkboxGroupValue">
      <n-checkbox value="Option 1">Option 1</n-checkbox>
      <n-checkbox value="Option 2">Option 2</n-checkbox>
      <n-checkbox value="Option 3">Option 3</n-checkbox>
    </n-checkbox-group>
  </n-form-item-row>
  <n-form-item-row label="Radio Group" path="radioGroupValue" required>
    <n-radio-group v-model="model.radioGroupValue">
      <n-radio value="Radio 1">Radio 1</n-radio>
      <n-radio value="Radio 2">Radio 2</n-radio>
      <n-radio value="Radio 3">Radio 3</n-radio>
    </n-radio-group>
  </n-form-item-row>
  <n-form-item-row label="Radio Button Group" path="radioGroupValue" required>
    <n-radio-group v-model="model.radioGroupValue">
      <n-radio-button value="Radio 1">Radio 1</n-radio-button>
      <n-radio-button value="Radio 2">Radio 2</n-radio-button>
      <n-radio-button value="Radio 3">Radio 3</n-radio-button>
    </n-radio-group>
  </n-form-item-row>
  <n-form-item-row label="Input Number" path="inputNumberValue" required>
    <n-input-number v-model="model.inputNumberValue"/>
  </n-form-item-row>
  <n-form-item-row label="Time Picker" path="timePickerValue" required>
    <n-time-picker v-model="model.timePickerValue" />
  </n-form-item-row>
  <n-form-item-row label="Slider" path="sliderValue" required>
    <n-slider v-model="model.sliderValue" :step="5"/>
  </n-form-item-row>
  <n-form-item-row label="Transfer" path="transferValue" required>
    <n-transfer
      v-model="model.transferValue"
      :options="generalOptions"
    />
  </n-form-item-row>
  <n-form-item-row  :gutter="[28, 0]" label="Nested Path">
    <n-row :gutter="[28, 0]" >
      <n-form-item-col :span="12" path="nestedValue.path1" required>
        <n-input placeholder="Nested Path 1" v-model="model.nestedValue.path1"/>
      </n-form-item-col>
      <n-form-item-col :span="12" path="nestedValue.path2" required>
        <n-select placeholder="Nested Path 2" :options="generalOptions" v-model="model.nestedValue.path2"/>
      </n-form-item-col>
    </n-row>
  </n-form-item-row>
  <n-row :gutter="[0, 24]">
    <n-col :span="24">
      <div style="display: flex; justify-content: flex-end;">
        <n-button @click="handleValidateButtonClick" round type="primary">Validate</n-button>
      </div>
    </n-col>
  </n-row>
</n-form>

<pre>
{{  JSON.stringify(model, 0, 2) }}
</pre>
```

```js
export default {
  data () {
    return {
      model: {
        inputValue: null,
        textareaValue: null,
        selectValue: null,
        multipleSelectValue: null,
        datetimeValue: null,
        nestedValue: {
          path1: null,
          path2: null
        },
        switchValue: false,
        checkboxGroupValue: null,
        radioGroupValue: null,
        radioButtonGroupValue: null,
        inputNumberValue: null,
        timePickerValue: null,
        sliderValue: 0,
        transferValue: null
      },
      generalOptions: [
        'groode',
        'veli good',
        'emazing',
        'lidiculous'
      ].map(v => ({
        label: v,
        value: v
      }))
    }
  },
  methods: {
    handleValidateButtonClick (e) {
      e.preventDefault()
      this.$refs.form.validate()
    }
  }
}
```