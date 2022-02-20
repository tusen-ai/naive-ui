<markdown>
# Dark Debug 1
</markdown>

<template>
  <n-button @click="modalActive = !modalActive">
    Toggle
  </n-button>
  <n-drawer v-model:show="modalActive" width="800">
    <n-drawer-content :native-scrollbar="false">
      <template #header>
        Header
      </template>
      <template #footer>
        Footer
      </template>
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
      <n-form
        ref="form"
        :model="model"
        :rules="rules"
        :size="size"
        label-placement="top"
      >
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
                maxRows: 5
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
            <n-date-picker
              v-model:value="model.datetimeValue"
              type="datetime"
            />
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
              <n-checkbox value="Option 1">
                Option 1
              </n-checkbox>
              <n-checkbox value="Option 2">
                Option 2
              </n-checkbox>
              <n-checkbox value="Option 3">
                Option 3
              </n-checkbox>
            </n-checkbox-group>
          </n-form-item-col>
          <n-form-item-col
            :span="12"
            label="Radio Group"
            path="radioGroupValue"
          >
            <n-radio-group
              v-model:value="model.radioGroupValue"
              name="radiogroup1"
            >
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
          </n-form-item-col>
        </n-row>
        <n-row :gutter="24">
          <n-form-item-col
            :span="12"
            label="Radio Button Group"
            path="radioGroupValue"
          >
            <n-radio-group
              v-model:value="model.radioGroupValue"
              name="radiogroup2"
            >
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
          <n-form-item-col
            :span="12"
            label="Time Picker"
            path="timePickerValue"
          >
            <n-time-picker v-model:value="model.timePickerValue" />
          </n-form-item-col>
          <n-form-item-col :span="12" label="Slider" path="sliderValue">
            <n-slider v-model:value="model.sliderValue" :step="5" />
          </n-form-item-col>
        </n-row>
        <n-row :gutter="24">
          <n-form-item-col :span="14" label="Transfer" path="transferValue">
            <n-transfer
              v-model:value="model.transferValue"
              style="width: 100%"
              :options="generalOptions"
            />
          </n-form-item-col>
          <n-form-item-col
            :span="5"
            label="Nested Path"
            path="nestedValue.path1"
          >
            <n-cascader
              v-model:value="model.nestedValue.path1"
              placeholder="Nested Path 1"
              :options="cascaderOptions"
            />
          </n-form-item-col>
          <n-form-item-col :span="5" path="nestedValue.path2">
            <n-select
              v-model:value="model.nestedValue.path2"
              placeholder="Nested Path 2"
              :options="generalOptions"
            />
          </n-form-item-col>
        </n-row>
        <n-row>
          <n-col :span="24">
            <div style="display: flex; justify-content: flex-end">
              <n-button round type="primary" @click="handleValidateButtonClick">
                验证
              </n-button>
            </div>
          </n-col>
        </n-row>
      </n-form>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'
import type { FormInst, FormProps, FormRules } from 'naive-ui'

export default defineComponent({
  setup () {
    return {
      message: useMessage()
    }
  },
  data () {
    return {
      modalActive: false,
      size: 'medium' as FormProps['size'],
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
      generalOptions: ['groode', 'veli good', 'emazing', 'lidiculous'].map(
        (v) => ({
          label: v,
          value: v
        })
      ),
      cascaderOptions: [
        {
          label: 'groode',
          value: 'groode',
          children: [
            {
              label: 'veli good',
              value: 'veli good'
            }
          ]
        }
      ],
      rules: {
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
        sliderValue: 0,
        transferValue: {
          type: 'array',
          required: true,
          trigger: 'change',
          message: '请输入 transferValue'
        }
      } as FormRules
    }
  },
  methods: {
    handleValidateButtonClick (e: MouseEvent) {
      e.preventDefault()
      ;(this.$refs.form as FormInst).validate((errors) => {
        if (!errors) {
          this.message.success('验证成功')
        } else {
          console.log(errors)
          this.message.error('验证失败')
        }
      })
    }
  }
})
</script>
