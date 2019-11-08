# Debug
```html
<n-form :model="model" ref="form">
  <n-row :gutter="[28, 0]">
    <n-form-item-col :span="12" label="Trigger Name" path="name" required>
      <n-input placeholder="Trigger Name" v-model="model.name" />
    </n-form-item-col>
  </n-row>
  <n-form-item-row :span="24" label="Description" path="description" required>
    <n-input placeholder="Description" v-model="model.description" />
  </n-form-item-row>
  <n-row :gutter="[28, 0]">
    <n-form-item-col :span="12" label="Trigger Type" path="type" required>
      <n-select placeholder="Trigger Type" :options="generalOptions" v-model="model.type"/>
    </n-form-item-col>
    <n-form-item-col :span="12" label="Start Time" path="startTime" required>
      <n-date-picker type="datetime" v-model="model.startTime"/>
    </n-form-item-col>
  </n-row>
  <n-row :gutter="[28, 0]">
    <n-col :span="12">
      <n-row :gutter="16">
        <n-form-item-col :span="12" label="Interval" path="interval.value" required>
          <n-input placeholder="Interval" v-model="model.interval.value"/>
        </n-form-item-col>
        <n-form-item-col :span="12" path="interval.unit" required>
          <n-select
            placeholder="Interval Unit"
            :options="generalOptions"
            v-model="model.interval.unit"
          />
        </n-form-item-col>
      </n-row>
    </n-col>
  </n-row>
  <n-row :gutter="[28, 0]">
    <n-col :span="12">
      <n-row :gutter="16">
        <n-form-item-col :span="12" label="Count" path="count" required>
          <n-input placeholder="Count" v-model="model.count"/>
        </n-form-item-col>
        <n-form-item-col :span="12" label="Location" path="location" required>
          <n-select placeholder="Location" :options="generalOptions" v-model="model.location"/>
        </n-form-item-col>
      </n-row>
    </n-col>
    <n-col :span="12">
      <n-row :gutter="16">
        <n-form-item-col :span="12" label="Status" path="status.value" required>
          <n-select placeholder="Status" :options="generalOptions" v-model="model.status.value"/>
        </n-form-item-col>
        <n-form-item-col :span="12" label="Type" path="status.type" required>
          <n-select placeholder="Type" :options="generalOptions" v-model="model.status.type"/>
        </n-form-item-col>
      </n-row>
    </n-col>
  </n-row>
  <n-row :gutter="28">
    <n-form-item-col :span="12" label="Tmpfs" path="Tmpfs" required>
      <n-input v-model="model.Tmpfs" />
    </n-form-item-col>
    <n-col :span="12">
      <n-row :gutter="16">
        <n-form-item-col :span="18" label="Shm Size" path="shmSize" required>
          <n-input v-model="model.shmSize" />
        </n-form-item-col>
        <n-form-item-col :span="6" label="Host" path="host" required>
          <n-switch v-model="model.host" />
        </n-form-item-col>
      </n-row>
    </n-col>
  </n-row>
  <n-row :gutter="24">
    <n-form-item-col :span="12" label="Checkbox" path="checkboxGroupValue" required>
      <n-checkbox-group v-model="model.checkboxGroupValue">
        <n-checkbox value="Option 1">Option 1</n-checkbox>
        <n-checkbox value="Option 2">Option 2</n-checkbox>
        <n-checkbox value="Option 3">Option 3</n-checkbox>
      </n-checkbox-group>
    </n-form-item-col>
    <n-form-item-col :span="12" label="Radio Group" path="radioGroupValue" required>
      <n-radio-group v-model="model.radioGroupValue">
        <n-radio value="Radio 1">Radio 1</n-radio>
        <n-radio value="Radio 2">Radio 2</n-radio>
        <n-radio value="Radio 3">Radio 3</n-radio>
      </n-radio-group>
    </n-form-item-col>
  </n-row>
  <n-row :gutter="24">
    <n-form-item-col :span="12" label="Radio Group" path="radioGroupValue" required>
      <n-radio-group v-model="model.radioGroupValue">
        <n-radio-button value="Radio 1">Radio 1</n-radio-button>
        <n-radio-button value="Radio 2">Radio 2</n-radio-button>
        <n-radio-button value="Radio 3">Radio 3</n-radio-button>
      </n-radio-group>
    </n-form-item-col>
    <n-form-item-col :span="12" label="Input Number" path="inputNumberValue" required>
      <n-input-number v-model="model.inputNumberValue"/>
    </n-form-item-col>
  </n-row>
  <n-row :gutter="24">
    <n-form-item-col :span="6" label="Time Picker" path="timePickerValue" required>
      <n-time-picker v-model="model.timePickerValue" />
    </n-form-item-col>
    <n-form-item-col :span="12" label="Slider" path="sliderValue" required>
      <n-slider v-model="model.sliderValue" :step="5"/>
    </n-form-item-col>
  </n-row>
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
        name: null,
        description: null,
        type: null,
        startTime: null,
        interval: {
          value: null,
          unit: null
        },
        count: null,
        location: null,
        status: {
          value: null,
          type: null
        },
        host: false,
        tmpfs: null,
        shmSize: null,
        checkboxGroupValue: null,
        radioGroupValue: null,
        radioButtonGroupValue: null,
        inputNumberValue: null,
        timePickerValue: null,
        sliderValue: 0
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