# 自定义验证

你可能需要自定义验证的时机和效果，使用 `validation-status` 和 `feedback` 来控制表项的验证效果。在这种情况下通常不需要提供 `path`。

```html
<n-form>
  <n-form-item
    label="飞机场的"
    :validation-status="inputValidationStatus"
    :feedback="inputFeedback"
  >
    <n-input v-model:value="inputValue" clearable />
  </n-form-item>
  <n-form-item
    label="飞机场的"
    :validation-status="inputNumberValidationStatus"
    :feedback="inputNumberFeedback"
  >
    <n-input-number v-model:value="inputNumberValue" />
  </n-form-item>
  <n-form-item
    label="飞机场的"
    :validation-status="selectValidationStatus"
    :feedback="selectFeedback"
  >
    <n-select v-model:value="selectValue" :options="selectOptions" clearable />
  </n-form-item>
</n-form>
```

```js
function createStatus (value) {
  switch (value) {
    case '10: 30':
      return 'success'
    case '10: 29':
      return 'warning'
    default:
      return 'error'
  }
}

function createFeedback (value) {
  switch (value) {
    case '10: 30':
      return null
    case '10: 29':
      return '虽然差不多了，请把时间调到 10: 30'
    default:
      return '请把时间调到 10: 30'
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
