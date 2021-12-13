# Customizing input content

```html
<n-dynamic-input
  v-model:value="customValue"
  :on-create="onCreate"
  #="{ value }"
>
  <div style="display: flex; align-items: center; width: 100%;">
    <n-checkbox v-model:checked="value.isCheck" style="margin-right: 12px;" />
    <n-input-number
      v-model:value="value.num"
      style="margin-right: 12px; width: 160px;"
    />
    <n-input v-model:value="value.string" type="text" />
  </div>
</n-dynamic-input>
<pre>
{{  JSON.stringify(customValue, 0, 2) }}
</pre>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      customValue: ref([
        {
          isCheck: true,
          num: 1,
          string: 'A String'
        }
      ]),
      onCreate () {
        return {
          isCheck: false,
          num: 1,
          string: 'A String'
        }
      }
    }
  }
})
```
