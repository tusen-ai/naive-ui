# Events

```html
<n-space vertical>
  <n-date-picker
    v-model:value="datetime"
    type="datetime"
    :disabled="disabled"
    @blur="onBlur1"
    @update:value="onChange1"
  />
  <n-date-picker
    v-model:value="date"
    type="date"
    :disabled="disabled"
    @blur="onBlur2"
    @update:value="onChange2"
  />
  <n-date-picker
    v-model:value="datetimerange"
    :disabled="disabled"
    type="datetimerange"
    @blur="onBlur3"
    @update:value="onChange3"
  />
  <n-date-picker
    v-model:value="daterange"
    :disabled="disabled"
    type="daterange"
    @blur="onBlur4"
    @update:value="onChange4"
  />
  <n-switch v-model:value="disabled" />
</n-space>
```

```js
export default {
  inject: ['message'],
  data() {
    return {
      datetime: 1183135260000,
      date: null,
      datetimerange: null,
      daterange: null,
      disabled: false
    }
  },
  methods: {
    onBlur1() {
      this.message.info('Blur-1')
    },
    onChange1(v) {
      this.message.info('Change-1 ' + v)
    },
    onBlur2() {
      this.message.error('Blur-2')
    },
    onChange2(v) {
      this.message.error('Change-2 ' + v)
    },
    onBlur3() {
      this.message.warning('Blur-3')
    },
    onChange3(v) {
      this.message.warning('Change-3 ' + v)
    },
    onBlur4() {
      this.message.success('Blur-4')
    },
    onChange4(v) {
      this.message.success('Change-4 ' + v)
    }
  }
}
```
