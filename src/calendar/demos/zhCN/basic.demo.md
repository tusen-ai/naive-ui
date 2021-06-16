# 基础用法

一个普通的日历。

```html
<n-calendar @update:value="handleUpdateValue" #="{ year, month, date }">
  {{ year }}-{{ month }}-{{ date }}
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
