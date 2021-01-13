# Custom Validation

You may need to manually custom the timing and the effect of a validation. Use `validation-status` and `feedback` to control the validation effect of a form item. In this case, there's usually no need for providing a `path` for the form item.

```html
<n-form>
  <n-form-item
    label="Airport's"
    :validation-status="inputValidationStatus"
    :feedback="inputFeedback"
  >
    <n-input v-model:value="inputValue" clearable />
  </n-form-item>
  <n-form-item
    label="Airport's"
    :validation-status="inputNumberValidationStatus"
    :feedback="inputNumberFeedback"
  >
    <n-input-number v-model:value="inputNumberValue" />
  </n-form-item>
  <n-form-item
    label="Airport's"
    :validation-status="selectValidationStatus"
    :feedback="selectFeedback"
  >
    <n-select
      debug
      v-model:value="selectValue"
      :options="selectOptions"
      clearable
    />
  </n-form-item>
</n-form>
```

```js
function createStatus (value) {
  switch (value) {
    case '10: 30':
      return undefined
    case '10: 29':
      return 'warning'
    default:
      return 'error'
  }
}

function createFeedback (value) {
  switch (value) {
    case '10: 30':
      return 'The plane of 10:30 has arrived.'
    case '10: 29':
      return 'Almost there, please set the time to 10: 30'
    default:
      return 'Please set the time to 10: 30'
  }
}

function createTimeForNumber (num) {
  return `${parseInt(num / 100, 10)}: ${num % 100}`
}

export default {
  computed: {
    inputValidationStatus () {
      return createStatus(this.inputValue)
    },
    inputFeedback () {
      return createFeedback(this.inputValue)
    },
    inputNumberValidationStatus () {
      return createStatus(createTimeForNumber(this.inputNumberValue))
    },
    inputNumberFeedback () {
      return createFeedback(createTimeForNumber(this.inputNumberValue))
    },
    selectValidationStatus () {
      return createStatus(this.selectValue)
    },
    selectFeedback () {
      return createFeedback(this.selectValue)
    }
  },
  data () {
    return {
      inputValue: '10: 29',
      inputNumberValue: 1029,
      selectValue: '10: 29',
      selectOptions: [
        {
          label: '10: 28',
          value: '10: 28'
        },
        {
          label: '10: 29',
          value: '10: 29'
        },
        {
          label: '10: 30',
          value: '10: 30'
        }
      ]
    }
  }
}
```
