# Basic

A basic calender.

```html
<n-calendar @update:value="handleUpdateValue">
  <template #="{ year, month, date }">
    {{ year }}-{{ month }}-{{ date }}
  </template>
</n-calendar>
```

```js
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      handleUpdateValue (_, { year, month, date }) {
        message.success(`${year}-${month}-${date}`)
      }
    }
  }
})
```
