# Basic

A basic calender.

```html
<n-calendar
  @update:value="handleUpdateValue"
  #="{ year, month, date }"
  v-model:value="value"
  :is-date-disabled="isDateDisabled"
>
  {{ year }}-{{ month }}-{{ date }}
</n-calendar>
```

```js
import { defineComponent, ref } from 'vue'
import { useMessage } from 'naive-ui'
import { isYesterday, addDays } from 'date-fns'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      value: ref(addDays(Date.now(), 1).valueOf()),
      handleUpdateValue (_, { year, month, date }) {
        message.success(`${year}-${month}-${date}`)
      },
      isDateDisabled (timestamp) {
        if (isYesterday(timestamp)) {
          return true
        }
        return false
      }
    }
  }
})
```
