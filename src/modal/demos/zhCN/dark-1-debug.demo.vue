<markdown>
# Dark Debug 1
</markdown>

<script lang="ts" setup>
import type { FormRules } from 'naive-ui'
import type { Size } from '../../../form/src/interface'
import { reactive, ref } from 'vue'

const drawerActive = ref(false)
const showModal = ref(false)
const size = ref<Size | undefined>('medium')

const rules: FormRules = {
  inputValue: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入 inputValue'
  },
  textareaValue: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入 textareaValue'
  },
  selectValue: {
    required: true,
    trigger: ['blur', 'change'],
    message: '请选择 selectValue'
  },
  multipleSelectValue: {
    type: 'array',
    required: true,
    trigger: ['blur', 'change'],
    message: '请选择 multipleSelectValue'
  },
  datetimeValue: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: '请输入 datetimeValue'
  },
  nestedValue: {
    path1: {
      required: true,
      trigger: ['blur', 'input'],
      message: '请输入 nestedValue.path1'
    },
    path2: {
      required: true,
      trigger: ['blur', 'change'],
      message: '请输入 nestedValue.path2'
    }
  },
  checkboxGroupValue: {
    type: 'array',
    required: true,
    trigger: 'change',
    message: '请选择 checkboxGroupValue'
  },
  radioGroupValue: {
    required: true,
    trigger: 'change',
    message: '请选择 radioGroupValue'
  },
  radioButtonGroupValue: {
    required: true,
    trigger: 'change',
    message: '请选择 radioButtonGroupValue'
  },
  inputNumberValue: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: '请输入 inputNumberValue'
  },
  timePickerValue: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: '请输入 timePickerValue'
  },
  transferValue: {
    type: 'array',
    required: true,
    trigger: 'change',
    message: '请输入 transferValue'
  }
}

const model = reactive({
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
})

const generalOptions = ['groode', 'veli good', 'emazing', 'lidiculous'].map(
  v => ({
    label: v,
    value: v
  })
)
</script>

<template>
  <n-button @click="showModal = !showModal">
    Toggle
  </n-button>
  <n-modal
    v-model:show="showModal"
    title="Dark Modal Debug"
    preset="card"
    :style="{ marginTop: '24px', marginBottom: '24px', width: '800px' }"
  >
    <n-radio-group
      v-model:value="size"
      name="top-size"
      style="margin-bottom: 12px"
    >
      <n-radio-button value="small">
        小
      </n-radio-button>
      <n-radio-button value="medium">
        中
      </n-radio-button>
      <n-radio-button value="large">
        大
      </n-radio-button>
    </n-radio-group>
    <n-form :model="model" :rules="rules" :size="size" label-placement="top">
      <n-row :gutter="24">
        <n-form-item-col :span="12" label="Input" path="inputValue">
          <n-input v-model:value="model.inputValue" placeholder="Input" />
        </n-form-item-col>
        <n-form-item-col :span="12" label="Textarea" path="textareaValue">
          <n-input
            v-model:value="model.textareaValue"
            placeholder="Textarea"
            type="textarea"
            :autosize="{
              minRows: 3,
              maxRows: 5,
            }"
          />
        </n-form-item-col>
      </n-row>
      <n-row :gutter="24">
        <n-form-item-col :span="12" label="Select" path="selectValue">
          <n-select
            v-model:value="model.selectValue"
            placeholder="Select"
            :options="generalOptions"
          />
        </n-form-item-col>
        <n-form-item-col
          :span="12"
          label="Multiple Select"
          path="multipleSelectValue"
        >
          <n-select
            v-model:value="model.multipleSelectValue"
            placeholder="Select"
            :options="generalOptions"
            multiple
          />
        </n-form-item-col>
      </n-row>
      <n-row :gutter="24">
        <n-form-item-col :span="12" label="Datetime" path="datetimeValue">
          <n-date-picker v-model:value="model.datetimeValue" type="datetime" />
        </n-form-item-col>
        <n-form-item-col :span="12" label="Switch" path="switchValue">
          <n-switch v-model:value="model.switchValue" />
        </n-form-item-col>
      </n-row>
      <n-row :gutter="24">
        <n-form-item-col
          :span="12"
          label="Checkbox Group"
          path="checkboxGroupValue"
        >
          <n-checkbox-group v-model:value="model.checkboxGroupValue">
            <n-space>
              <n-checkbox value="option1">
                Option 1
              </n-checkbox>
              <n-checkbox value="option2">
                Option 2
              </n-checkbox>
              <n-checkbox value="option3">
                Option 3
              </n-checkbox>
            </n-space>
          </n-checkbox-group>
        </n-form-item-col>
        <n-form-item-col :span="12" label="Radio Group" path="radioGroupValue">
          <n-radio-group
            v-model:value="model.radioGroupValue"
            name="radiogroup1"
          >
            <n-space>
              <n-radio value="radio1">
                Radio 1
              </n-radio>
              <n-radio value="radio2">
                Radio 2
              </n-radio>
              <n-radio value="radio3">
                Radio 3
              </n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item-col>
      </n-row>
      <n-row :gutter="24">
        <n-form-item-col
          :span="12"
          label="Radio Button Group"
          path="radioButtonGroupValue"
        >
          <n-radio-group v-model:value="model.radioButtonGroupValue">
            <n-radio-button value="radio-button1">
              Radio Button 1
            </n-radio-button>
            <n-radio-button value="radio-button2">
              Radio Button 2
            </n-radio-button>
            <n-radio-button value="radio-button3">
              Radio Button 3
            </n-radio-button>
          </n-radio-group>
        </n-form-item-col>
        <n-form-item-col
          :span="12"
          label="Input Number"
          path="inputNumberValue"
        >
          <n-input-number v-model:value="model.inputNumberValue" />
        </n-form-item-col>
      </n-row>
      <n-row :gutter="24">
        <n-form-item-col :span="12" label="Time Picker" path="timePickerValue">
          <n-time-picker v-model:value="model.timePickerValue" />
        </n-form-item-col>
        <n-form-item-col :span="12" label="Slider" path="sliderValue">
          <n-slider v-model:value="model.sliderValue" />
        </n-form-item-col>
      </n-row>
      <n-row :gutter="24">
        <n-form-item-col :span="24" label="Transfer" path="transferValue">
          <n-transfer
            v-model:value="model.transferValue"
            :options="generalOptions"
          />
        </n-form-item-col>
      </n-row>
      <n-row :gutter="24">
        <n-form-item-col
          :span="12"
          label="Nested Path"
          path="nestedValue.path1"
        >
          <n-input v-model:value="model.nestedValue.path1" />
        </n-form-item-col>
        <n-form-item-col
          :span="12"
          label="Nested Path"
          path="nestedValue.path2"
        >
          <n-select
            v-model:value="model.nestedValue.path2"
            :options="generalOptions"
          />
        </n-form-item-col>
      </n-row>
      <n-row>
        <n-col :span="24">
          <div style="display: flex; justify-content: flex-end">
            <n-button round type="primary" @click="drawerActive = true">
              抽屉
            </n-button>
          </div>
        </n-col>
      </n-row>
    </n-form>
  </n-modal>
  <n-drawer v-model:show="drawerActive" :width="502">
    <n-drawer-content title="斥力装置和二踢脚">
      <n-form
        :model="model"
        :rules="rules"
        :size="size"
        label-placement="left"
        label-align="left"
        :label-width="100"
      >
        <n-form-item-row label="Input" path="inputValue">
          <n-input v-model:value="model.inputValue" placeholder="Input" />
        </n-form-item-row>
        <n-form-item-row label="Textarea" path="textareaValue">
          <n-input
            v-model:value="model.textareaValue"
            placeholder="Textarea"
            type="textarea"
            :autosize="{
              minRows: 3,
              maxRows: 5,
            }"
          />
        </n-form-item-row>
        <n-form-item-row label="Select" path="selectValue">
          <n-select
            v-model:value="model.selectValue"
            placeholder="Select"
            :options="generalOptions"
          />
        </n-form-item-row>
        <n-form-item-row label="Multiple Select" path="multipleSelectValue">
          <n-select
            v-model:value="model.multipleSelectValue"
            placeholder="Select"
            :options="generalOptions"
            multiple
          />
        </n-form-item-row>
        <n-form-item-row label="Datetime" path="datetimeValue">
          <n-date-picker
            v-model:value="model.datetimeValue"
            type="datetime"
            clearable
          />
        </n-form-item-row>
        <n-form-item-row label="Switch" path="switchValue">
          <n-switch v-model:value="model.switchValue" />
        </n-form-item-row>
        <n-form-item-row label="Checkbox Group" path="checkboxGroupValue">
          <n-checkbox-group v-model:value="model.checkboxGroupValue">
            <n-space>
              <n-checkbox value="option1">
                Option 1
              </n-checkbox>
              <n-checkbox value="option2">
                Option 2
              </n-checkbox>
              <n-checkbox value="option3">
                Option 3
              </n-checkbox>
            </n-space>
          </n-checkbox-group>
        </n-form-item-row>
        <n-form-item-row label="Radio Group" path="radioGroupValue">
          <n-radio-group
            v-model:value="model.radioGroupValue"
            name="radiogroup2"
          >
            <n-space>
              <n-radio value="radio1">
                Radio 1
              </n-radio>
              <n-radio value="radio2">
                Radio 2
              </n-radio>
              <n-radio value="radio3">
                Radio 3
              </n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item-row>
        <n-form-item-row
          label="Radio Button Group"
          path="radioButtonGroupValue"
        >
          <n-radio-group v-model:value="model.radioButtonGroupValue">
            <n-radio-button value="radio-button1">
              Radio Button 1
            </n-radio-button>
            <n-radio-button value="radio-button2">
              Radio Button 2
            </n-radio-button>
            <n-radio-button value="radio-button3">
              Radio Button 3
            </n-radio-button>
          </n-radio-group>
        </n-form-item-row>
        <n-form-item-row label="Input Number" path="inputNumberValue">
          <n-input-number v-model:value="model.inputNumberValue" />
        </n-form-item-row>
        <n-form-item-row label="Time Picker" path="timePickerValue">
          <n-time-picker v-model:value="model.timePickerValue" />
        </n-form-item-row>
        <n-form-item-row label="Slider" path="sliderValue">
          <n-slider v-model:value="model.sliderValue" />
        </n-form-item-row>
        <n-form-item-row label="Transfer" path="transferValue">
          <n-transfer
            v-model:value="model.transferValue"
            :options="generalOptions"
          />
        </n-form-item-row>
        <n-form-item-row label="Nested Path" path="nestedValue.path1">
          <n-input v-model:value="model.nestedValue.path1" />
        </n-form-item-row>
        <n-form-item-row label="Nested Path" path="nestedValue.path2">
          <n-select
            v-model:value="model.nestedValue.path2"
            :options="generalOptions"
          />
        </n-form-item-row>
      </n-form>
    </n-drawer-content>
  </n-drawer>
</template>
