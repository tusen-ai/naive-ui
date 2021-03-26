# 事件

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
import { defineComponent, ref } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      datetime: ref(1183135260000),
      date: ref(null),
      datetimerange: ref(null),
      daterange: ref(null),
      disabled: ref(false),
      onBlur1 () {
        message.info('Blur-1')
      },
      onChange1 (v) {
        message.info('Change-1 ' + v)
      },
      onBlur2 () {
        message.error('Blur-2')
      },
      onChange2 (v) {
        message.error('Change-2 ' + v)
      },
      onBlur3 () {
        message.warning('Blur-3')
      },
      onChange3 (v) {
        message.warning('Change-3 ' + v)
      },
      onBlur4 () {
        message.success('Blur-4')
      },
      onChange4 (v) {
        message.success('Change-4 ' + v)
      }
    }
  }
})
```
